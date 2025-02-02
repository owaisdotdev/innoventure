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
    let validatedEntity: any;

    // Validate based on the user's role and return the respective entity
    if (payload.role === 'investor') {
      validatedEntity = await this.investorService.findByEmail(payload.email);
    } else if (payload.role === 'startup') {
      validatedEntity = await this.startupService.findByEmail(payload.email);
    } else if (payload.role === 'admin') {
      validatedEntity = await this.adminService.findByEmail(payload.email);
    }

    // If no user/entity is found, throw UnauthorizedException
    if (!validatedEntity) {
      throw new UnauthorizedException('User not found or unauthorized');
    }

    // Depending on the role, return the corresponding entity object
    return {
      id: validatedEntity.id,
      email: validatedEntity.email,
      role: payload.role,
      entity: validatedEntity, // Attach the entire object (investor, startup, or admin)
    };
  }
}
