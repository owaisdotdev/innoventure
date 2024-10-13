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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const investor_service_1 = require("../investor/investor.service");
const startup_service_1 = require("../startup/startup.service");
const createInvestor_dto_1 = require("../dto/createInvestor.dto");
const createStartup_dto_1 = require("../dto/createStartup.dto");
const login_dto_1 = require("../dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const requestPasswordReset_dto_1 = require("../dto/requestPasswordReset.dto");
const resetPassword_dto_1 = require("../dto/resetPassword.dto");
let AuthController = class AuthController {
    constructor(authService, investorService, startupService) {
        this.authService = authService;
        this.investorService = investorService;
        this.startupService = startupService;
    }
    async signupInvestor(createInvestorDto) {
        try {
            const existingInvestor = await this.investorService.findByEmail(createInvestorDto.email);
            if (existingInvestor) {
                throw new common_1.ConflictException('Email already in use');
            }
            const investor = await this.investorService.createInvestor(createInvestorDto);
            return investor;
        }
        catch (error) {
            console.error('Error during investor signup:', error.stack || error.message);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred during the signup process');
        }
    }
    async signupStartup(createStartupDto) {
        try {
            const existingStartup = await this.startupService.findByEmail(createStartupDto.email);
            if (existingStartup) {
                throw new common_1.ConflictException('Email already in use');
            }
            const startup = await this.startupService.createStartup(createStartupDto);
            return startup;
        }
        catch (error) {
            console.error('Error during startup signup:', error.stack || error.message);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred during the signup process');
        }
    }
    async loginInvestor(loginDto) {
        try {
            const investor = await this.authService.validateInvestor(loginDto.email, loginDto.password);
            if (!investor) {
                throw new common_1.UnauthorizedException('Invalid login credentials');
            }
            return this.authService.loginInvestor(investor);
        }
        catch (error) {
            console.error('Error during investor login:', error.stack || error.message);
            throw new common_1.UnauthorizedException('Invalid login credentials');
        }
    }
    async loginStartup(loginDto) {
        try {
            const startup = await this.authService.validateStartup(loginDto.email, loginDto.password);
            if (!startup) {
                throw new common_1.UnauthorizedException('Invalid login credentials');
            }
            return this.authService.loginStartup(startup);
        }
        catch (error) {
            console.error('Error during startup login:', error.stack || error.message);
            throw new common_1.UnauthorizedException('Invalid login credentials');
        }
    }
    async loginAdmin(loginDto) {
        try {
            const admin = await this.authService.validateAdmin(loginDto.email, loginDto.password);
            if (!admin) {
                throw new common_1.UnauthorizedException('Invalid login credentials');
            }
            return this.authService.loginAdmin(admin);
        }
        catch (error) {
            console.error('Error during admin login:', error.stack || error.message);
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
    }
    async requestPasswordReset(requestPasswordResetDto) {
        try {
            return await this.authService.requestPasswordReset(requestPasswordResetDto.email, requestPasswordResetDto.role);
        }
        catch (error) {
            console.error('Error during password reset request:', error.stack || error.message);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred during the password reset process');
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            return await this.authService.resetPassword(resetPasswordDto.email, resetPasswordDto.role, resetPasswordDto.resetCode, resetPasswordDto.newPassword);
        }
        catch (error) {
            console.error('Error during password reset:', error.stack || error.message);
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred during the password reset process');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup/investor'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Signup as an investor' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Investor successfully signed up and logged in.',
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already in use.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    (0, swagger_1.ApiBody)({
        type: createInvestor_dto_1.CreateInvestorDto,
        description: 'Investor signup details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createInvestor_dto_1.CreateInvestorDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupInvestor", null);
__decorate([
    (0, common_1.Post)('signup/startup'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Signup as a startup' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Startup successfully signed up and logged in.',
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already in use.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    (0, swagger_1.ApiBody)({
        type: createStartup_dto_1.CreateStartupDto,
        description: 'Startup signup details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStartup_dto_1.CreateStartupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupStartup", null);
__decorate([
    (0, common_1.Post)('login/investor'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login as an investor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investor successfully logged in.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid login credentials.',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
        description: 'Investor login details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginInvestor", null);
__decorate([
    (0, common_1.Post)('login/startup'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login as a startup' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startup successfully logged in.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid login credentials.',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
        description: 'Startup login details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginStartup", null);
__decorate([
    (0, common_1.Post)('login/admin'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login as an admin' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin successfully logged in.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid login credentials.',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
        description: 'Admin login details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('request-password-reset'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Request Password Reset',
        description: 'Request a password reset by providing your email and role. A reset code will be sent to your email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reset code sent to the provided email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No user found with the provided email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error.',
    }),
    (0, swagger_1.ApiBody)({
        type: requestPasswordReset_dto_1.RequestPasswordResetDto,
        description: 'Password reset request details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestPasswordReset_dto_1.RequestPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset Password',
        description: 'Reset your password by providing your email, role, reset code, and new password.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid or expired reset code.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No user found with the provided email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error.',
    }),
    (0, swagger_1.ApiBody)({
        type: resetPassword_dto_1.ResetPasswordDto,
        description: 'Password reset details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        investor_service_1.InvestorService,
        startup_service_1.StartupService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map