"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractModule = void 0;
const common_1 = require("@nestjs/common");
const smart_contract_service_1 = require("./smart-contract.service");
const smart_contract_controller_1 = require("./smart-contract.controller");
const mongoose_1 = require("@nestjs/mongoose");
const smartContract_schema_1 = require("../schemas/smartContract.schema");
const milestone_schema_1 = require("../schemas/milestone.schema");
const milestone_module_1 = require("../milestone/milestone.module");
const investment_schema_1 = require("../schemas/investment.schema");
const startup_schema_1 = require("../schemas/startup.schema");
let SmartContractModule = class SmartContractModule {
};
exports.SmartContractModule = SmartContractModule;
exports.SmartContractModule = SmartContractModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: smartContract_schema_1.SmartContract.name, schema: smartContract_schema_1.SmartContractSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: milestone_schema_1.Milestone.name, schema: milestone_schema_1.MilestoneSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: investment_schema_1.Investment.name, schema: investment_schema_1.InvestmentSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema },
            ]),
            milestone_module_1.MilestoneModule,
        ],
        providers: [smart_contract_service_1.SmartContractService],
        controllers: [smart_contract_controller_1.SmartContractController],
        exports: [smart_contract_service_1.SmartContractService]
    })
], SmartContractModule);
//# sourceMappingURL=smart-contract.module.js.map