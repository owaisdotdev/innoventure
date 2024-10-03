import {
  Controller,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { CreateInvestorDto } from '../dto/createInvestor.dto';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { LoginDto } from '../dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RequestPasswordResetDto } from '../dto/requestPasswordReset.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';

@ApiTags('Authentication') // Grouping all auth-related endpoints under "Authentication"
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private investorService: InvestorService,
    private startupService: StartupService,
  ) {}

  @Post('signup/investor')
  @HttpCode(201)
  @ApiOperation({ summary: 'Signup as an investor' })
  @ApiResponse({
    status: 201,
    description: 'Investor successfully signed up and logged in.',
  })
  @ApiResponse({ status: 409, description: 'Email already in use.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    type: CreateInvestorDto,
    description: 'Investor signup details',
  })
  async signupInvestor(@Body() createInvestorDto: CreateInvestorDto) {
    try {
      // Check if the email is already registered
      const existingInvestor = await this.investorService.findByEmail(
        createInvestorDto.email,
      );
      if (existingInvestor) {
        throw new ConflictException('Email already in use');
      }

      // Create the investor and login
      const investor =
        await this.investorService.createInvestor(createInvestorDto);
      return investor;
    } catch (error) {
      console.error(
        'Error during investor signup:',
        error.stack || error.message,
      );

      // If it's a known error, rethrow it, otherwise throw a generic error
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during the signup process',
      );
    }
  }

  @Post('signup/startup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Signup as a startup' })
  @ApiResponse({
    status: 201,
    description: 'Startup successfully signed up and logged in.',
  })
  @ApiResponse({ status: 409, description: 'Email already in use.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    type: CreateStartupDto,
    description: 'Startup signup details',
  })
  async signupStartup(@Body() createStartupDto: CreateStartupDto) {
    try {
      // Check if the email is already registered
      const existingStartup = await this.startupService.findByEmail(
        createStartupDto.email,
      );
      if (existingStartup) {
        throw new ConflictException('Email already in use');
      }

      // Create the startup and login
      const startup = await this.startupService.createStartup(createStartupDto);
      return startup;
    } catch (error) {
      console.error(
        'Error during startup signup:',
        error.stack || error.message,
      );

      // If it's a known error, rethrow it, otherwise throw a generic error
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during the signup process',
      );
    }
  }

  @Post('login/investor')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login as an investor' })
  @ApiResponse({
    status: 200,
    description: 'Investor successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid login credentials.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Investor login details',
  })
  async loginInvestor(@Body() loginDto: LoginDto) {
    try {
      const investor = await this.authService.validateInvestor(
        loginDto.email,
        loginDto.password,
      );
      // Check if investor is null and throw an UnauthorizedException
      if (!investor) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      return this.authService.loginInvestor(investor);
    } catch (error) {
      console.error(
        'Error during investor login:',
        error.stack || error.message,
      );
      throw new UnauthorizedException('Invalid login credentials');
    }
  }

  @Post('login/startup')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login as a startup' })
  @ApiResponse({
    status: 200,
    description: 'Startup successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid login credentials.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Startup login details',
  })
  async loginStartup(@Body() loginDto: LoginDto) {
    try {
      const startup = await this.authService.validateStartup(
        loginDto.email,
        loginDto.password,
      );
      if (!startup) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      return this.authService.loginStartup(startup);
    } catch (error) {
      console.error(
        'Error during startup login:',
        error.stack || error.message,
      );
      throw new UnauthorizedException('Invalid login credentials');
    }
  }

  @Post('login/admin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login as an admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid login credentials.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Admin login details',
  })
  async loginAdmin(@Body() loginDto: LoginDto) {
    try {
      const admin = await this.authService.validateAdmin(
        loginDto.email,
        loginDto.password,
      );
      if (!admin) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      return this.authService.loginAdmin(admin);
    } catch (error) {
      console.error('Error during admin login:', error.stack || error.message);
      throw new UnauthorizedException('Invalid admin credentials');
    }
  }

  // ===================== Password Reset Endpoints =====================

  @Post('request-password-reset')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Request Password Reset',
    description:
      'Request a password reset by providing your email and role. A reset code will be sent to your email.',
  })
  @ApiResponse({
    status: 200,
    description: 'Reset code sent to the provided email.',
  })
  @ApiResponse({
    status: 404,
    description: 'No user found with the provided email.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    type: RequestPasswordResetDto,
    description: 'Password reset request details',
  })
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    try {
      return await this.authService.requestPasswordReset(
        requestPasswordResetDto.email,
        requestPasswordResetDto.role,
      );
    } catch (error) {
      console.error(
        'Error during password reset request:',
        error.stack || error.message,
      );

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during the password reset process',
      );
    }
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Reset Password',
    description:
      'Reset your password by providing your email, role, reset code, and new password.',
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired reset code.',
  })
  @ApiResponse({
    status: 404,
    description: 'No user found with the provided email.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Password reset details',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(
        resetPasswordDto.email,
        resetPasswordDto.role,
        resetPasswordDto.resetCode,
        resetPasswordDto.newPassword,
      );
    } catch (error) {
      console.error(
        'Error during password reset:',
        error.stack || error.message,
      );

      if (
        error instanceof ConflictException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred during the password reset process',
      );
    }
  }
}
