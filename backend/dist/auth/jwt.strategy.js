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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const investor_service_1 = require("../investor/investor.service");
const startup_service_1 = require("../startup/startup.service");
const admin_service_1 = require("../admin/admin.service");
const config_1 = require("@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(investorService, startupService, adminService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.investorService = investorService;
        this.startupService = startupService;
        this.adminService = adminService;
        this.configService = configService;
    }
    async validate(payload) {
        let validatedEntity;
        if (payload.role === 'investor') {
            validatedEntity = await this.investorService.findByEmail(payload.email);
        }
        else if (payload.role === 'startup') {
            validatedEntity = await this.startupService.findByEmail(payload.email);
        }
        else if (payload.role === 'admin') {
            validatedEntity = await this.adminService.findByEmail(payload.email);
        }
        else {
            throw new common_1.UnauthorizedException('Invalid role in token');
        }
        if (!validatedEntity) {
            throw new common_1.UnauthorizedException('User not found or unauthorized');
        }
        return {
            id: validatedEntity._id,
            email: validatedEntity.email,
            role: payload.role,
            entity: validatedEntity,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [investor_service_1.InvestorService,
        startup_service_1.StartupService,
        admin_service_1.AdminService,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map