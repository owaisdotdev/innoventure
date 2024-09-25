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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private investorService: InvestorService,
    private startupService: StartupService,
  ) {}

  @Post('signup/investor')
  @HttpCode(201) // Explicitly set status code
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
      return this.authService.loginInvestor(investor);
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
  @HttpCode(201) // Explicitly set status code
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
      return this.authService.loginStartup(startup);
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

  // Login for Investors
  @Post('login/investor')
  @HttpCode(200)
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

  // Login for Startups
  @Post('login/startup')
  @HttpCode(200)
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

  // Login for Admins
  @Post('login/admin')
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
}
