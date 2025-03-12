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
    private readonly investorService: InvestorService,
    private readonly startupService: StartupService,
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Changed to match .env
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
    } else {
      throw new UnauthorizedException('Invalid role in token');
    }

    // If no user/entity is found, throw UnauthorizedException
    if (!validatedEntity) {
      throw new UnauthorizedException('User not found or unauthorized');
    }

    // Return the validated entity with role and ID
    return {
      id: validatedEntity._id, // Changed to _id for MongoDB consistency
      email: validatedEntity.email,
      role: payload.role,
      entity: validatedEntity,
    };
  }
}