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
exports.InvestorController = void 0;
const common_1 = require("@nestjs/common");
const investor_service_1 = require("./investor.service");
const updateInvestor_dto_1 = require("../dto/updateInvestor.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_2 = require("@nestjs/common");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const investor_schema_1 = require("../schemas/investor.schema");
let InvestorController = class InvestorController {
    constructor(investorService) {
        this.investorService = investorService;
    }
    async getAllInvestors() {
        try {
            return await this.investorService.findAllInvestors();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch investors');
        }
    }
    async getInvestorByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email query parameter is required');
        }
        try {
            const investor = await this.investorService.findByEmail(email);
            if (!investor) {
                throw new common_1.NotFoundException(`Investor with email ${email} not found`);
            }
            return investor;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investor by email');
        }
    }
    async getBySector(sector) {
        if (!sector) {
            throw new common_1.BadRequestException('Sector query parameter is required');
        }
        try {
            return await this.investorService.findBySector(sector);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by sector');
        }
    }
    async getInvestorsByRegion(region) {
        if (!region) {
            throw new common_1.BadRequestException('Region query parameter is required');
        }
        try {
            return await this.investorService.findByRegion(region);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by region');
        }
    }
    async getInvestorsByRiskTolerance(riskTolerance) {
        if (!riskTolerance) {
            throw new common_1.BadRequestException('Risk tolerance query parameter is required');
        }
        try {
            return await this.investorService.findByRiskTolerance(riskTolerance);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by risk tolerance');
        }
    }
    async getInvestorsByMinInvestment(minInvestment) {
        if (!minInvestment) {
            throw new common_1.BadRequestException('Minimum investment query parameter is required');
        }
        try {
            return await this.investorService.findByMinInvestment(minInvestment);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by minimum investment');
        }
    }
    async getInvestorsByMaxInvestment(maxInvestment) {
        if (!maxInvestment) {
            throw new common_1.BadRequestException('Maximum investment query parameter is required');
        }
        try {
            return await this.investorService.findByMaxInvestment(maxInvestment);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by maximum investment');
        }
    }
    async getInvestorsByProfileStatus(profileStatus) {
        if (!profileStatus) {
            throw new common_1.BadRequestException('Profile status query parameter is required');
        }
        try {
            return await this.investorService.findByProfileStatus(profileStatus);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by profile status');
        }
    }
    async getByInvestmentRange(minInvestment, maxInvestment) {
        if (!minInvestment || !maxInvestment) {
            throw new common_1.BadRequestException('Both min and max query parameters are required');
        }
        try {
            return await this.investorService.findByInvestmentRange(minInvestment, maxInvestment);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching investors by investment range');
        }
    }
    async getInvestorById(id) {
        const investor = await this.investorService.findInvestorById(id);
        if (!investor) {
            throw new common_1.NotFoundException(`Investor with ID ${id} not found`);
        }
        return investor;
    }
    async updateInvestor(id, updateInvestorDto) {
        try {
            const updatedInvestor = await this.investorService.updateInvestor(id, updateInvestorDto);
            if (!updatedInvestor) {
                throw new common_1.NotFoundException(`Investor with ID ${id} not found`);
            }
            return updatedInvestor;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating investor');
        }
    }
    async deleteInvestor(id) {
        try {
            const result = await this.investorService.deleteInvestor(id);
            if (!result) {
                throw new common_1.NotFoundException(`Investor with ID ${id} not found`);
            }
            return true;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting investor', error);
        }
    }
};
exports.InvestorController = InvestorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all investors', description: 'Retrieve a list of all investors.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Failed to fetch investors.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getAllInvestors", null);
__decorate([
    (0, common_1.Get)('/email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investor by email', description: 'Retrieve an investor by their email address.' }),
    (0, swagger_1.ApiQuery)({
        name: 'email',
        required: true,
        description: 'Email of the investor',
        type: String,
        example: 'investor@example.com',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investor retrieved successfully.',
        type: investor_schema_1.Investor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Email query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Investor with the provided email not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investor by email.',
    }),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorByEmail", null);
__decorate([
    (0, common_1.Get)('/sector'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by sector', description: 'Retrieve investors based on their preferred sector.' }),
    (0, swagger_1.ApiQuery)({
        name: 'sector',
        required: true,
        description: 'Sector to filter investors by',
        type: String,
        example: 'Tech',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Sector query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by sector.',
    }),
    __param(0, (0, common_1.Query)('sector')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getBySector", null);
__decorate([
    (0, common_1.Get)('/region'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by region', description: 'Retrieve investors based on their preferred region.' }),
    (0, swagger_1.ApiQuery)({
        name: 'region',
        required: true,
        description: 'Region to filter investors by',
        type: String,
        example: 'US',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Region query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by region.',
    }),
    __param(0, (0, common_1.Query)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorsByRegion", null);
__decorate([
    (0, common_1.Get)('/risk-tolerance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by risk tolerance', description: 'Retrieve investors based on their risk tolerance preference.' }),
    (0, swagger_1.ApiQuery)({
        name: 'riskTolerance',
        required: true,
        description: 'Risk tolerance level to filter investors by',
        type: String,
        example: 'Medium',
        enum: ['Low', 'Medium', 'High'],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Risk tolerance query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by risk tolerance.',
    }),
    __param(0, (0, common_1.Query)('riskTolerance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorsByRiskTolerance", null);
__decorate([
    (0, common_1.Get)('/min-investment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by minimum investment', description: 'Retrieve investors based on their minimum investment criteria.' }),
    (0, swagger_1.ApiQuery)({
        name: 'minInvestment',
        required: true,
        description: 'Minimum investment amount to filter investors by',
        type: Number,
        example: 1000,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Minimum investment query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by minimum investment.',
    }),
    __param(0, (0, common_1.Query)('minInvestment', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorsByMinInvestment", null);
__decorate([
    (0, common_1.Get)('/max-investment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by maximum investment', description: 'Retrieve investors based on their maximum investment criteria.' }),
    (0, swagger_1.ApiQuery)({
        name: 'maxInvestment',
        required: true,
        description: 'Maximum investment amount to filter investors by',
        type: Number,
        example: 5000,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Maximum investment query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by maximum investment.',
    }),
    __param(0, (0, common_1.Query)('maxInvestment', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorsByMaxInvestment", null);
__decorate([
    (0, common_1.Get)('/profile-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by profile status', description: 'Retrieve investors based on their profile status.' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: true,
        description: 'Profile status to filter investors by',
        type: String,
        example: 'active',
        enum: ['active', 'inactive'],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Profile status query parameter is required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by profile status.',
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorsByProfileStatus", null);
__decorate([
    (0, common_1.Get)('/investment-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investors by investment range', description: 'Retrieve investors within a specific investment range.' }),
    (0, swagger_1.ApiQuery)({
        name: 'min',
        required: true,
        description: 'Minimum investment amount',
        type: Number,
        example: 1000,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'max',
        required: true,
        description: 'Maximum investment amount',
        type: Number,
        example: 100000,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investors retrieved successfully.',
        type: [investor_schema_1.Investor],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Both min and max query parameters are required.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investors by investment range.',
    }),
    __param(0, (0, common_1.Query)('min', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Query)('max', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getByInvestmentRange", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investor by ID', description: 'Retrieve a specific investor by their unique ID.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the investor',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investor retrieved successfully.',
        type: investor_schema_1.Investor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Investor with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error fetching investor by ID.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update investor', description: 'Update the details of an existing investor.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the investor to update',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiBody)({
        type: updateInvestor_dto_1.UpdateInvestorDto,
        description: 'Investor update details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investor updated successfully.',
        type: investor_schema_1.Investor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Investor with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error updating investor.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateInvestor_dto_1.UpdateInvestorDto]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateInvestor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.AdminGuard),
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete investor', description: 'Delete an existing investor by their unique ID. Requires admin privileges.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Unique identifier of the investor to delete',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investor deleted successfully.',
        schema: {
            type: 'boolean',
            example: true,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Investor with the provided ID not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error deleting investor.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "deleteInvestor", null);
exports.InvestorController = InvestorController = __decorate([
    (0, swagger_1.ApiTags)('Investors'),
    (0, common_1.Controller)('investors'),
    __metadata("design:paramtypes", [investor_service_1.InvestorService])
], InvestorController);
//# sourceMappingURL=investor.controller.js.map