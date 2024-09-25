import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { AdminService } from '../admin/admin.service'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private investorService: InvestorService,
    private startupService: StartupService,
    private adminService: AdminService, 
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    let user;

    // Validate based on the user's role
    if (payload.role === 'INVESTOR') {
      user = await this.investorService.findByEmail(payload.email);
    } else if (payload.role === 'STARTUP') {
      user = await this.startupService.findByEmail(payload.email);
    } else if (payload.role === 'ADMIN') {
      user = await this.adminService.findByEmail(payload.email); // Assuming you have an AdminService
    }

    if (!user) {
      throw new UnauthorizedException('User not found or unauthorized');
    }

    // Return the user details that will be available in the request
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
