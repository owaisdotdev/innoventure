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
exports.StartupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const startup_service_1 = require("./startup.service");
const createStartup_dto_1 = require("../dto/createStartup.dto");
const updateStartup_dto_1 = require("../dto/updateStartup.dto");
const startup_schema_1 = require("../schemas/startup.schema");
let StartupController = class StartupController {
    constructor(startupService) {
        this.startupService = startupService;
    }
    async createStartup(createStartupDto) {
        try {
            return await this.startupService.createStartup(createStartupDto);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException(`Failed to create startup: ${error.message}`);
        }
    }
    async getAllStartups() {
        try {
            return await this.startupService.findAllStartups();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch startups: ${error.message}`);
        }
    }
    async getStartupByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email query parameter is required');
        }
        const startup = await this.startupService.findByEmail(email);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with email ${email} not found`);
        }
        return startup;
    }
    async getByIndustry(industry) {
        if (!industry) {
            throw new common_1.BadRequestException('Industry query parameter is required');
        }
        try {
            return await this.startupService.findByIndustry(industry);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch startups by industry: ${error.message}`);
        }
    }
    async getStartupById(id) {
        const startup = await this.startupService.findStartupById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return startup;
    }
    async updateStartup(id, updateStartupDto) {
        try {
            const updatedStartup = await this.startupService.updateStartup(id, updateStartupDto);
            if (!updatedStartup) {
                throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
            }
            return updatedStartup;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException(`Failed to update startup: ${error.message}`);
        }
    }
    async deleteStartup(id) {
        try {
            const result = await this.startupService.deleteStartup(id);
            if (!result) {
                throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException(`Failed to delete startup: ${error.message}`);
        }
    }
};
exports.StartupController = StartupController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new startup',
        description: 'Register a new startup in the system.',
    }),
    (0, swagger_1.ApiBody)({
        type: createStartup_dto_1.CreateStartupDto,
        description: 'Startup creation details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Startup created successfully.',
        type: startup_schema_1.Startup,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request (e.g., duplicate email).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while creating startup.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStartup_dto_1.CreateStartupDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "createStartup", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all startups',
        description: 'Retrieve a list of all startups.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of startups retrieved successfully.',
        type: [startup_schema_1.Startup],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while fetching startups.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getAllStartups", null);
__decorate([
    (0, common_1.Get)('/email'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get startup by email',
        description: 'Retrieve a startup by their email address.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'email',
        required: true,
        description: 'Email of the startup',
        type: String,
        example: 'startup@example.com',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startup retrieved successfully.',
        type: startup_schema_1.Startup,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Email query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Startup with the provided email not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while fetching startup by email.',
    }),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupByEmail", null);
__decorate([
    (0, common_1.Get)('/industry'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get startups by industry',
        description: 'Retrieve startups based on their industry.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'industry',
        required: true,
        description: 'Industry to filter startups by',
        type: String,
        example: 'AI',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startups retrieved successfully.',
        type: [startup_schema_1.Startup],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Industry query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while fetching startups by industry.',
    }),
    __param(0, (0, common_1.Query)('industry')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getByIndustry", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get startup by ID',
        description: 'Retrieve a specific startup by their unique ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the startup',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startup retrieved successfully.',
        type: startup_schema_1.Startup,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Startup with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while fetching startup by ID.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update startup',
        description: 'Update the details of an existing startup.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the startup to update',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiBody)({
        type: updateStartup_dto_1.UpdateStartupDto,
        description: 'Startup update details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startup updated successfully.',
        type: startup_schema_1.Startup,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Startup with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while updating startup.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateStartup_dto_1.UpdateStartupDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "updateStartup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.AdminGuard),
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete startup',
        description: 'Delete an existing startup by their unique ID. Requires admin privileges.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the startup to delete',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Startup deleted successfully.',
        schema: {
            type: 'boolean',
            example: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Startup with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error while deleting startup.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "deleteStartup", null);
exports.StartupController = StartupController = __decorate([
    (0, swagger_1.ApiTags)('Startups'),
    (0, common_1.Controller)('startups'),
    __metadata("design:paramtypes", [startup_service_1.StartupService])
], StartupController);
//# sourceMappingURL=startup.controller.js.map