import { JwtService } from '@nestjs/jwt';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { JwtPayload } from './jwt-payload.interface';
import { AdminService } from '../admin/admin.service';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly investorService;
    private readonly startupService;
    private readonly adminService;
    private readonly emailService;
    constructor(jwtService: JwtService, investorService: InvestorService, startupService: StartupService, adminService: AdminService, emailService: EmailService);
    loginInvestor(investor: any): Promise<{
        access_token: string;
        investor: any;
    }>;
    loginStartup(startup: any): Promise<{
        access_token: string;
        startup: any;
    }>;
    loginAdmin(admin: any): Promise<{
        access_token: string;
        admin: any;
    }>;
    validateInvestor(email: string, password: string): Promise<any>;
    validateStartup(email: string, password: string): Promise<any>;
    validateAdmin(email: string, password: string): Promise<any>;
    validateJwtPayload(payload: JwtPayload): Promise<any>;
    requestPasswordReset(email: string, role: 'investor' | 'startup' | 'admin'): Promise<{
        message: string;
    }>;
    resetPassword(email: string, role: 'investor' | 'startup' | 'admin', resetCode: string, newPassword: string): Promise<{
        message: string;
    }>;
}
