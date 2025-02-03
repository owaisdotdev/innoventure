import { AuthService } from './auth.service';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { CreateInvestorDto } from '../dto/createInvestor.dto';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { LoginDto } from '../dto/login.dto';
import { RequestPasswordResetDto } from '../dto/requestPasswordReset.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
export declare class AuthController {
    private authService;
    private investorService;
    private startupService;
    constructor(authService: AuthService, investorService: InvestorService, startupService: StartupService);
    signupInvestor(createInvestorDto: CreateInvestorDto): Promise<import("../schemas/investor.schema").Investor>;
    signupStartup(createStartupDto: CreateStartupDto): Promise<import("../schemas/startup.schema").Startup>;
    loginInvestor(loginDto: LoginDto): Promise<{
        access_token: string;
        investor: any;
    }>;
    loginStartup(loginDto: LoginDto): Promise<{
        access_token: string;
        startup: any;
    }>;
    loginAdmin(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: any;
    }>;
    requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
