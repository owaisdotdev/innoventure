import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { JwtPayload } from './jwt-payload.interface';
import { AdminService } from '../admin/admin.service';
import { EmailService } from '../email/email.service';

function generateResetCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly investorService: InvestorService,
    private readonly startupService: StartupService,
    private readonly adminService: AdminService,
    private readonly emailService: EmailService,
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
    const { password, ...safeStartup } = startup;
    return {
      access_token: this.jwtService.sign(payload),
      startup: safeStartup,
    };
  }

  // Login for Admins
  async loginAdmin(admin: any) {
    const payload = { email: admin.email, sub: admin.id, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload), // Your JWT logic here
      admin,
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

  // Admin validation logic
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    if (admin && password === admin.password) {
      return admin;
    }

    throw new UnauthorizedException('Invalid admin credentials');
  }

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
    } else if (payload.role === 'admin') {
      const admin = await this.adminService.findAdminById(payload.sub);
      if (!admin) {
        throw new UnauthorizedException('Invalid JWT Token');
      }
      return admin;
    }
    throw new UnauthorizedException('Invalid JWT Token');
  }

   async requestPasswordReset(email: string, role: 'investor' | 'startup' | 'admin') {
    let user: any;

    if (role === 'investor') {
      user = await this.investorService.findByEmail(email);
    } else if (role === 'startup') {
      user = await this.startupService.findByEmail(email);
    } else if (role === 'admin') {
      user = await this.adminService.findByEmail(email);
    }

    if (!user) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    const resetCode = generateResetCode(); 
    const resetCodeExpiration = new Date();
    resetCodeExpiration.setMinutes(resetCodeExpiration.getMinutes() + 15); 

    user.resetCode = resetCode;
    user.resetCodeExpiration = resetCodeExpiration;

    if (role === 'investor') {
      await this.investorService.updateInvestor(user._id, user);
    } else if (role === 'startup') {
      await this.startupService.updateStartup(user._id, user);
    } 

    // Send email with the reset code (via EmailService)
    await this.emailService.sendResetPasswordEmail(email, resetCode);

    return { message: 'Reset code sent to your email.' };
  }

  // Method to verify reset code and update password
  async resetPassword(
    email: string,
    role: 'investor' | 'startup' | 'admin',
    resetCode: string,
    newPassword: string,
  ) {
    let user: any;

    // Fetch user by role
    if (role === 'investor') {
      user = await this.investorService.findByEmail(email);
    } else if (role === 'startup') {
      user = await this.startupService.findByEmail(email);
    } 

    if (!user) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    // Verify reset code and expiration
    if (user.resetCode !== resetCode || new Date() > user.resetCodeExpiration) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset code fields
    user.password = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpiration = null;

    // Update user in the database
    if (role === 'investor') {
      await this.investorService.updateInvestor(user._id, user);
    } else if (role === 'startup') {
      await this.startupService.updateStartup(user._id, user);
    }

    return { message: 'Password updated successfully.' };
  }
}
