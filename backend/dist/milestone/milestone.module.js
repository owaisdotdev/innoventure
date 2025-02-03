"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneModule = void 0;
const common_1 = require("@nestjs/common");
const milestone_service_1 = require("./milestone.service");
const milestone_controller_1 = require("./milestone.controller");
const milestone_schema_1 = require("../schemas/milestone.schema");
const mongoose_1 = require("@nestjs/mongoose");
const startup_module_1 = require("../startup/startup.module");
const startup_schema_1 = require("../schemas/startup.schema");
let MilestoneModule = class MilestoneModule {
};
exports.MilestoneModule = MilestoneModule;
exports.MilestoneModule = MilestoneModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: milestone_schema_1.Milestone.name, schema: milestone_schema_1.MilestoneSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema }]),
            startup_module_1.StartupModule,
        ],
        providers: [milestone_service_1.MilestoneService],
        controllers: [milestone_controller_1.MilestoneController],
        exports: [milestone_service_1.MilestoneService]
    })
], MilestoneModule);
//# sourceMappingURL=milestone.module.js.map