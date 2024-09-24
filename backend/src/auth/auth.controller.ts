import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  HttpCode,
  ConflictException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger'; 
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRole } from '../schemas/user.schema';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private investorService: InvestorService,
    private startupService: StartupService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user (Investor/Startup)' }) // Description for the endpoint
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Missing or invalid fields.',
  })
  @ApiResponse({ status: 409, description: 'Conflict - Email already in use.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Something went wrong during signup.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'password123' },
        role: {
          type: 'string',
          example: 'Investor',
          enum: ['Investor', 'Startup'],
        },
        roleSpecificData: {
          type: 'object',
          description: 'Role-specific data depending on the user role.',
        },
      },
      required: ['name', 'email', 'password', 'role', 'roleSpecificData'], // Required fields for Swagger
    },
  })
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: UserRole,
    @Body('roleSpecificData') roleSpecificData: any,
  ) {
    try {
      if (!name || !email || !password || !role) {
        throw new BadRequestException('Missing required fields');
      }

      if (role === UserRole.INVESTOR && !roleSpecificData?.profileStatus) {
        throw new BadRequestException('Missing required fields');
      }

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }

      const user = await this.userService.createUser(
        name,
        email,
        password,
        role,
      );

      // Role-specific handling
      if (role === UserRole.INVESTOR) {
        if (!roleSpecificData)
          throw new BadRequestException('Investor data is required');
        await this.investorService.createInvestor({
          userId: user._id,
          name,
          email,
          password,
          ...roleSpecificData,
        });
      } else if (role === UserRole.STARTUP) {
        if (!roleSpecificData)
          throw new BadRequestException('Startup data is required');
        await this.startupService.createStartup({
          userId: user._id,
          name,
          email,
          password,
          ...roleSpecificData,
        });
      } else {
        throw new BadRequestException('Invalid role');
      }

      // Return the validated user
      return this.authService.validateUser(email, password);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error; // Rethrow known error
      }

      console.error('Error during signup:', error.message);
      throw new InternalServerErrorException('Signup process failed');
    }
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log in a user and get an access token' }) // Description for the endpoint
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Something went wrong during login.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'], // Required fields for Swagger
    },
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.authService.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.authService.login(user);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new UnauthorizedException('Invalid credentials');
      }
      console.error('Error during login:', error.message);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
