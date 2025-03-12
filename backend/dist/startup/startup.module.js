"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const startup_service_1 = require("./startup.service");
const startup_controller_1 = require("./startup.controller");
const startup_schema_1 = require("../schemas/startup.schema");
let StartupModule = class StartupModule {
};
exports.StartupModule = StartupModule;
exports.StartupModule = StartupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema }]),
        ],
        providers: [startup_service_1.StartupService],
        exports: [startup_service_1.StartupService],
        controllers: [startup_controller_1.StartupController],
    })
], StartupModule);
//# sourceMappingURL=startup.module.js.map