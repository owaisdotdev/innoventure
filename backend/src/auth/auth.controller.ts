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
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRole } from '../schemas/user.schema';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private investorService: InvestorService,
    private startupService: StartupService,
  ) {}

  @Post('signup')
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
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error; // Rethrow known error
      }

      console.error('Error during signup:', error.message);
      throw new InternalServerErrorException('Signup process failed');
    }
  }

  @Post('login')
  @HttpCode(200) 
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
      if (error.message == 'Invalid credentials') {
        throw new UnauthorizedException('Invalid credentials');
      }
      console.error('Error during login:', error.message);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
