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
exports.MilestoneController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const milestone_service_1 = require("./milestone.service");
let MilestoneController = class MilestoneController {
    constructor(milestoneService) {
        this.milestoneService = milestoneService;
    }
    async submitMilestone(body, file) {
        const milestone = await this.milestoneService.submitMilestone(body, file);
        return { message: 'Milestone submitted', milestone };
    }
};
exports.MilestoneController = MilestoneController;
__decorate([
    (0, common_1.Post)('submit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "submitMilestone", null);
exports.MilestoneController = MilestoneController = __decorate([
    (0, common_1.Controller)('milestones'),
    __metadata("design:paramtypes", [milestone_service_1.MilestoneService])
], MilestoneController);
//# sourceMappingURL=milestone.controller.js.map