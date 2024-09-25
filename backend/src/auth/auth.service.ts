import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly investorService: InvestorService,
    private readonly startupService: StartupService,
  ) {}

  // Login for Investors
  async loginInvestor(investor: any) {
    const payload: JwtPayload = {
      email: investor.email,
      role: 'investor',
      sub: investor._id,
    };
    const { password, ...safeInvestor } = investor; 
    return {
      access_token: this.jwtService.sign(payload),
      investor: safeInvestor,
    };
  }

  // Login for Startups
  async loginStartup(startup: any) {
    const payload: JwtPayload = {
      email: startup.email,
      role: 'startup',
      sub: startup._id,
    };
    const { password, ...safeStartup } = startup; // Exclude password
    return {
      access_token: this.jwtService.sign(payload),
      startup: safeStartup,
    };
  }

  // Validate Investor login credentials
  async validateInvestor(email: string, password: string): Promise<any> {
    const investor = await this.investorService.findByEmail(email);
    if (!investor) {
      throw new UnauthorizedException('Investor not found');
    }
    if (investor && (await bcrypt.compare(password, investor.password))) {
      return investor;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Validate Startup login credentials
  async validateStartup(email: string, password: string): Promise<any> {
    const startup = await this.startupService.findByEmail(email);
    if (!startup) {
      throw new UnauthorizedException('Startup not found');
    }
    if (startup && (await bcrypt.compare(password, startup.password))) {
      return startup;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Validate JWT token for both Investor and Startup
  async validateJwtPayload(payload: JwtPayload): Promise<any> {
    if (payload.role === 'investor') {
      const investor = await this.investorService.findInvestorById(payload.sub);
      if (!investor) {
        throw new UnauthorizedException('Invalid JWT Token');
      }
      return investor;
    } else if (payload.role === 'startup') {
      const startup = await this.startupService.findStartupById(payload.sub);
      if (!startup) {
        throw new UnauthorizedException('Invalid JWT Token');
      }
      return startup;
    }
    throw new UnauthorizedException('Invalid JWT Token');
  }
}
