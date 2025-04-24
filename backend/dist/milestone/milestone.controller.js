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
const mongoose_1 = require("mongoose");
let MilestoneController = class MilestoneController {
    constructor(milestoneService) {
        this.milestoneService = milestoneService;
    }
    async submitMilestone(body, file) {
        const milestone = await this.milestoneService.submitMilestone(body, file);
        return { message: 'Milestone submitted', milestone };
    }
    async getMilestoneById(id) {
        try {
            const milestone = await this.milestoneService.findMilestoneById(id);
            return milestone;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async addSmartContract(milestoneId, smartContractId) {
        if (!mongoose_1.Types.ObjectId.isValid(smartContractId)) {
            throw new common_1.BadRequestException('Invalid smartContractId format');
        }
        const updated = await this.milestoneService.addSmartContractToMilestone(milestoneId, new mongoose_1.Types.ObjectId(smartContractId));
        return {
            message: 'Smart contract added to milestone',
            milestone: updated,
        };
    }
    async getAllMilestones(startupId, status) {
        const query = {};
        if (startupId)
            query.startupId = startupId;
        if (status)
            query.status = status;
        return this.milestoneService.findMilestones(query);
    }
    async updateMilestoneStatus(id, status) {
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            throw new common_1.BadRequestException('Invalid status value');
        }
        const updated = await this.milestoneService.updateMilestoneStatus(id, status);
        return {
            message: `Milestone ${status}`,
            milestone: updated,
        };
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
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getMilestoneById", null);
__decorate([
    (0, common_1.Patch)(':id/add-smart-contract'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('smartContractId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "addSmartContract", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('startupId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getAllMilestones", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "updateMilestoneStatus", null);
exports.MilestoneController = MilestoneController = __decorate([
    (0, common_1.Controller)('milestones'),
    __metadata("design:paramtypes", [milestone_service_1.MilestoneService])
], MilestoneController);
//# sourceMappingURL=milestone.controller.js.map