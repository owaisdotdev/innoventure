import { Strategy } from 'passport-jwt';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { AdminService } from '../admin/admin.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private investorService;
    private startupService;
    private adminService;
    private configService;
    constructor(investorService: InvestorService, startupService: StartupService, adminService: AdminService, configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        role: any;
        entity: any;
    }>;
}
export {};
