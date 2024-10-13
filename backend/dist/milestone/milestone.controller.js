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
const milestone_service_1 = require("./milestone.service");
const updateMilestone_dto_1 = require("../dto/updateMilestone.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const milestone_schema_1 = require("../schemas/milestone.schema");
const createMilestone_dto_1 = require("../dto/createMilestone.dto");
const startup_service_1 = require("../startup/startup.service");
const mongoose_1 = require("mongoose");
let MilestoneController = class MilestoneController {
    constructor(milestoneService, startupService) {
        this.milestoneService = milestoneService;
        this.startupService = startupService;
    }
    async createMilestone(createMilestoneDto) {
        try {
            const startup = await this.startupService.findStartupById(createMilestoneDto.startupId.toString());
            if (!startup) {
                throw new common_1.NotFoundException(`Startup with ID ${createMilestoneDto.startupId} not found`);
            }
            const updatedDto = {
                ...createMilestoneDto,
                startupId: new mongoose_1.Types.ObjectId(createMilestoneDto.startupId.toString())
            };
            const milestone = await this.milestoneService.createMilestone(updatedDto);
            await this.startupService.addMilestoneToStartup(createMilestoneDto.startupId.toString(), new mongoose_1.Types.ObjectId(milestone._id.toString()));
            return milestone;
        }
        catch (error) {
            console.error('Error during milestone creation:', error.stack || error.message);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred during the milestone creation process');
        }
    }
    async getAllMilestones() {
        try {
            return await this.milestoneService.findAllMilestones();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch milestones');
        }
    }
    async getMilestonesByTitle(title) {
        if (!title) {
            throw new common_1.BadRequestException('title query parameter is required');
        }
        try {
            return await this.milestoneService.findByTitle(title);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching milestones by region');
        }
    }
    async getMilestonesBySmartContract(smartContractId) {
        if (!smartContractId) {
            throw new common_1.BadRequestException('smart contract id query parameter is required');
        }
        try {
            return await this.milestoneService.findBySmartContract(smartContractId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching milestones by smart contract');
        }
    }
    async getMilestoneById(id) {
        const milestone = await this.milestoneService.findMilestoneById(id);
        if (!milestone) {
            throw new common_1.NotFoundException(`milestone with ID ${id} not found`);
        }
        return milestone;
    }
    async updateMilestone(id, updateMilestoneDto) {
        try {
            const updatedMilestone = await this.milestoneService.updateMilestone(id, updateMilestoneDto);
            if (!updatedMilestone) {
                throw new common_1.NotFoundException(`milestone with ID ${id} not found`);
            }
            return updatedMilestone;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating milestone');
        }
    }
    async deleteMilestone(id) {
        try {
            const result = await this.milestoneService.findMilestoneById(id);
            if (!result) {
                throw new common_1.NotFoundException(`Milestone with ID ${id} not found`);
            }
            await this.startupService.removeMilestoneFromStartup(result.startupId._id.toString(), new mongoose_1.Types.ObjectId(result._id.toString()));
            await this.milestoneService.deleteMilestone(id);
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error deleting milestone', error);
        }
    }
};
exports.MilestoneController = MilestoneController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Create a milestone' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Milestone successfully created.',
        type: milestone_schema_1.Milestone,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Startup with the provided ID not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    (0, swagger_1.ApiBody)({
        type: createMilestone_dto_1.CreateMilestoneDto,
        description: 'Milestone creation details',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMilestone_dto_1.CreateMilestoneDto]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "createMilestone", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all milestones',
        description: 'Retrieve a list of all milestones.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of milestones retrieved successfully.',
        type: [milestone_schema_1.Milestone],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Failed to fetch milestones.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getAllMilestones", null);
__decorate([
    (0, common_1.Get)('/title'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get milestones by tile',
        description: 'Retrieve milestones based on their title.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'title',
        required: true,
        description: 'Tilte to filter milestones by',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'milestones retrieved successfully.',
        type: [milestone_schema_1.Milestone],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Title query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching milestones by title.',
    }),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getMilestonesByTitle", null);
__decorate([
    (0, common_1.Get)('/smart-contract'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get milestones by smart contract',
        description: 'Retrieve milestones based on their associated smart contract.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'smartContractId',
        required: true,
        description: 'smart contract id to filter milestones by',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'milestones retrieved successfully.',
        type: [milestone_schema_1.Milestone],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'smart contract query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching milestones by smart contract.',
    }),
    __param(0, (0, common_1.Query)('smartContractId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getMilestonesBySmartContract", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get milestone by ID',
        description: 'Retrieve a specific milestone by their unique ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the milestone',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'milestone retrieved successfully.',
        type: milestone_schema_1.Milestone,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'milestone with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching milestone by ID.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "getMilestoneById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update milestone',
        description: 'Update the details of an existing milestone.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the milestone to update',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiBody)({
        type: updateMilestone_dto_1.UpdateMilestoneDto,
        description: 'milestone update details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'milestone updated successfully.',
        type: milestone_schema_1.Milestone,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'milestone with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error updating milestone.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateMilestone_dto_1.UpdateMilestoneDto]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "updateMilestone", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.AdminGuard),
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete milestone',
        description: 'Delete an existing milestone by their unique ID. Requires admin privileges.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the milestone to delete',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Milestone deleted successfully.',
        schema: {
            type: 'boolean',
            example: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Milestone with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error deleting milestone.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MilestoneController.prototype, "deleteMilestone", null);
exports.MilestoneController = MilestoneController = __decorate([
    (0, swagger_1.ApiTags)('Milestones'),
    (0, common_1.Controller)('milestones'),
    __metadata("design:paramtypes", [milestone_service_1.MilestoneService,
        startup_service_1.StartupService])
], MilestoneController);
//# sourceMappingURL=milestone.controller.js.map