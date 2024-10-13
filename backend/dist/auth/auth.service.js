"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const investor_service_1 = require("../investor/investor.service");
const startup_service_1 = require("../startup/startup.service");
const admin_service_1 = require("../admin/admin.service");
const email_service_1 = require("../email/email.service");
function generateResetCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}
let AuthService = class AuthService {
    constructor(jwtService, investorService, startupService, adminService, emailService) {
        this.jwtService = jwtService;
        this.investorService = investorService;
        this.startupService = startupService;
        this.adminService = adminService;
        this.emailService = emailService;
    }
    async loginInvestor(investor) {
        const payload = {
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
    async loginStartup(startup) {
        const payload = {
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
    async loginAdmin(admin) {
        const payload = { email: admin.email, sub: admin.id, role: 'admin' };
        return {
            access_token: this.jwtService.sign(payload),
            admin,
        };
    }
    async validateInvestor(email, password) {
        const investor = await this.investorService.findByEmail(email);
        if (!investor) {
            throw new common_1.UnauthorizedException('Investor not found');
        }
        if (investor && (await bcrypt.compare(password, investor.password))) {
            return investor;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async validateStartup(email, password) {
        const startup = await this.startupService.findByEmail(email);
        if (!startup) {
            throw new common_1.UnauthorizedException('Startup not found');
        }
        if (startup && (await bcrypt.compare(password, startup.password))) {
            return startup;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async validateAdmin(email, password) {
        const admin = await this.adminService.findByEmail(email);
        if (!admin) {
            throw new common_1.UnauthorizedException('Admin not found');
        }
        if (admin && password === admin.password) {
            return admin;
        }
        throw new common_1.UnauthorizedException('Invalid admin credentials');
    }
    async validateJwtPayload(payload) {
        if (payload.role === 'investor') {
            const investor = await this.investorService.findInvestorById(payload.sub);
            if (!investor) {
                throw new common_1.UnauthorizedException('Invalid JWT Token');
            }
            return investor;
        }
        else if (payload.role === 'startup') {
            const startup = await this.startupService.findStartupById(payload.sub);
            if (!startup) {
                throw new common_1.UnauthorizedException('Invalid JWT Token');
            }
            return startup;
        }
        else if (payload.role === 'admin') {
            const admin = await this.adminService.findAdminById(payload.sub);
            if (!admin) {
                throw new common_1.UnauthorizedException('Invalid JWT Token');
            }
            return admin;
        }
        throw new common_1.UnauthorizedException('Invalid JWT Token');
    }
    async requestPasswordReset(email, role) {
        let user;
        if (role === 'investor') {
            user = await this.investorService.findByEmail(email);
        }
        else if (role === 'startup') {
            user = await this.startupService.findByEmail(email);
        }
        else if (role === 'admin') {
            user = await this.adminService.findByEmail(email);
        }
        if (!user) {
            throw new common_1.NotFoundException(`No user found with email ${email}`);
        }
        const resetCode = generateResetCode();
        const resetCodeExpiration = new Date();
        resetCodeExpiration.setMinutes(resetCodeExpiration.getMinutes() + 15);
        user.resetCode = resetCode;
        user.resetCodeExpiration = resetCodeExpiration;
        if (role === 'investor') {
            await this.investorService.updateInvestor(user._id, user);
        }
        else if (role === 'startup') {
            await this.startupService.updateStartup(user._id, user);
        }
        await this.emailService.sendResetPasswordEmail(email, resetCode);
        return { message: 'Reset code sent to your email.' };
    }
    async resetPassword(email, role, resetCode, newPassword) {
        let user;
        if (role === 'investor') {
            user = await this.investorService.findByEmail(email);
        }
        else if (role === 'startup') {
            user = await this.startupService.findByEmail(email);
        }
        if (!user) {
            throw new common_1.NotFoundException(`No user found with email ${email}`);
        }
        if (user.resetCode !== resetCode || new Date() > user.resetCodeExpiration) {
            throw new common_1.BadRequestException('Invalid or expired reset code');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetCode = null;
        user.resetCodeExpiration = null;
        if (role === 'investor') {
            await this.investorService.updateInvestor(user._id, user);
        }
        else if (role === 'startup') {
            await this.startupService.updateStartup(user._id, user);
        }
        return { message: 'Password updated successfully.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        investor_service_1.InvestorService,
        startup_service_1.StartupService,
        admin_service_1.AdminService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map