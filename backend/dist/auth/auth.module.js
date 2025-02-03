"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const investor_schema_1 = require("../schemas/investor.schema");
const startup_schema_1 = require("../schemas/startup.schema");
const startup_module_1 = require("../startup/startup.module");
const investor_module_1 = require("../investor/investor.module");
const config_1 = require("@nestjs/config");
const admin_module_1 = require("../admin/admin.module");
const email_module_1 = require("../email/email.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
            startup_module_1.StartupModule,
            investor_module_1.InvestorModule,
            admin_module_1.AdminModule,
            email_module_1.EmailModule,
            mongoose_1.MongooseModule.forFeature([
                { name: investor_schema_1.Investor.name, schema: investor_schema_1.InvestorSchema },
                { name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema },
            ]),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map