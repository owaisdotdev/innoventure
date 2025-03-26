"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const investor_module_1 = require("./investor/investor.module");
const startup_module_1 = require("./startup/startup.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const email_module_1 = require("./email/email.module");
const milestone_module_1 = require("./milestone/milestone.module");
const smart_contract_module_1 = require("./smart-contract/smart-contract.module");
const investment_module_1 = require("./investment/investment.module");
const dao_module_1 = require("./dao/dao.module");
const admin_dashboard_module_1 = require("./admin-dashboard/admin-dashboard.module");
const investor_dashboard_module_1 = require("./investor-dashboard/investor-dashboard.module");
const proposal_module_1 = require("./proposal/proposal.module");
const notification_module_1 = require("./notification/notification.module");
const chat_module_1 = require("./chat/chat.module");
const match_controller_1 = require("./match.controller");
const match_service_1 = require("./match.service");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    if (!uri) {
                        console.error('MONGODB_URI is not defined in .env');
                        throw new Error('MONGODB_URI is not defined in the .env file');
                    }
                    console.log(`Connecting to MongoDB at: ${uri}`);
                    return {
                        uri,
                    };
                },
            }),
            axios_1.HttpModule,
            investor_module_1.InvestorModule,
            startup_module_1.StartupModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            email_module_1.EmailModule,
            milestone_module_1.MilestoneModule,
            smart_contract_module_1.SmartContractModule,
            investment_module_1.InvestmentModule,
            dao_module_1.DaoModule,
            admin_dashboard_module_1.AdminDashboardModule,
            investor_dashboard_module_1.InvestorDashboardModule,
            proposal_module_1.ProposalsModule,
            notification_module_1.NotificationsModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController, match_controller_1.MatchController],
        providers: [app_service_1.AppService, match_service_1.MatchService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map