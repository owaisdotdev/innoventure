"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentModule = void 0;
const smart_contract_module_1 = require("./../smart-contract/smart-contract.module");
const common_1 = require("@nestjs/common");
const investment_service_1 = require("./investment.service");
const mongoose_1 = require("@nestjs/mongoose");
const investment_schema_1 = require("../schemas/investment.schema");
const investment_controller_1 = require("./investment.controller");
const smartContract_schema_1 = require("../schemas/smartContract.schema");
const investor_schema_1 = require("../schemas/investor.schema");
const investor_module_1 = require("../investor/investor.module");
const startup_module_1 = require("../startup/startup.module");
const startup_schema_1 = require("../schemas/startup.schema");
let InvestmentModule = class InvestmentModule {
};
exports.InvestmentModule = InvestmentModule;
exports.InvestmentModule = InvestmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: investment_schema_1.Investment.name, schema: investment_schema_1.InvestmentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: smartContract_schema_1.SmartContract.name, schema: smartContract_schema_1.SmartContractSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: investor_schema_1.Investor.name, schema: investor_schema_1.InvestorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema }]),
            smart_contract_module_1.SmartContractModule,
            investor_module_1.InvestorModule,
            startup_module_1.StartupModule
        ],
        providers: [investment_service_1.InvestmentService],
        exports: [investment_service_1.InvestmentService],
        controllers: [investment_controller_1.InvestmentController],
    })
], InvestmentModule);
//# sourceMappingURL=investment.module.js.map