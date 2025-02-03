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
exports.SmartContractController = void 0;
const common_1 = require("@nestjs/common");
const smart_contract_service_1 = require("./smart-contract.service");
const createSmartContract_dto_1 = require("../dto/createSmartContract.dto");
const updateSmartContract_dto_1 = require("../dto/updateSmartContract.dto");
const smartContract_schema_1 = require("../schemas/smartContract.schema");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const milestone_service_1 = require("../milestone/milestone.service");
let SmartContractController = class SmartContractController {
    constructor(smartContractService, mileStoneServive) {
        this.smartContractService = smartContractService;
        this.mileStoneServive = mileStoneServive;
    }
    async createSmartContract(createSmartContractDto) {
        const milestone = await this.mileStoneServive.findMilestoneById(createSmartContractDto.milestoneStatus.milestoneId.toString());
        if (!milestone) {
            throw new common_1.NotFoundException(`Milestone with ID ${createSmartContractDto.milestoneStatus.milestoneId} not found`);
        }
        const smartContract = await this.smartContractService.createsmartContract(createSmartContractDto);
        await this.mileStoneServive.addSmartContractToMilestone(milestone._id.toString(), new mongoose_1.Types.ObjectId(smartContract._id.toString()));
        return smartContract;
    }
    async findAllSmartContracts() {
        return this.smartContractService.findAllsmartContracts();
    }
    async findSmartContractById(id) {
        return this.smartContractService.findsmartContractById(id);
    }
    async updateSmartContract(id, updateSmartContractDto) {
        return this.smartContractService.updatesmartContract(id, updateSmartContractDto);
    }
    async addInvestmentToSmartContract(id, investmentId) {
        if (!mongoose_1.Types.ObjectId.isValid(investmentId)) {
            throw new common_1.BadRequestException('Invalid Investment ID format');
        }
        await this.smartContractService.addInvestmentTosmartContract(id, new mongoose_1.Types.ObjectId(investmentId));
    }
    async findByStatus(status) {
        return this.smartContractService.findByStatus(status);
    }
    async findByInvestmentId(investmentId) {
        return this.smartContractService.findByInvestmentId(investmentId);
    }
};
exports.SmartContractController = SmartContractController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Smart Contract' }),
    (0, swagger_1.ApiBody)({
        type: createSmartContract_dto_1.CreateSmartContractDto,
        description: 'Details to create a Smart Contract',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Smart Contract successfully created.',
        type: smartContract_schema_1.SmartContract,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request. Missing or invalid data.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSmartContract_dto_1.CreateSmartContractDto]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "createSmartContract", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all Smart Contracts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of Smart Contracts retrieved successfully.',
        type: [smartContract_schema_1.SmartContract],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "findAllSmartContracts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a Smart Contract by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the Smart Contract',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Smart Contract retrieved successfully.',
        type: smartContract_schema_1.SmartContract,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid ID format.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Smart Contract not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "findSmartContractById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Smart Contract by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the Smart Contract to update',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiBody)({
        type: updateSmartContract_dto_1.UpdateSmartContractDto,
        description: 'Details to update the Smart Contract',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Smart Contract updated successfully.',
        type: smartContract_schema_1.SmartContract,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid ID format or bad request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Smart Contract not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateSmartContract_dto_1.UpdateSmartContractDto]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "updateSmartContract", null);
__decorate([
    (0, common_1.Post)(':id/investment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add an Investment to a Smart Contract',
        description: 'Associates an Investment ID with a Smart Contract.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the Smart Contract',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                investmentId: {
                    type: 'string',
                    description: 'ID of the Investment to associate',
                    example: '60c72b2f9b1d8e1a4c8e4b3b',
                },
            },
            required: ['investmentId'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Investment added to Smart Contract successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid ID format.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Smart Contract not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('investmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "addInvestmentToSmartContract", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve Smart Contracts by Status' }),
    (0, swagger_1.ApiParam)({
        name: 'status',
        description: 'Status to filter Smart Contracts by',
        type: String,
        enum: ['Active', 'Completed'],
        example: 'Active',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of Smart Contracts filtered by status.',
        type: [smartContract_schema_1.SmartContract],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)('investment/:investmentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve Smart Contracts by Investment ID' }),
    (0, swagger_1.ApiParam)({
        name: 'investmentId',
        description: 'Investment ID to filter Smart Contracts by',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of Smart Contracts associated with the Investment ID.',
        type: [smartContract_schema_1.SmartContract],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('investmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartContractController.prototype, "findByInvestmentId", null);
exports.SmartContractController = SmartContractController = __decorate([
    (0, swagger_1.ApiTags)('SmartContracts'),
    (0, common_1.Controller)('smart-contracts'),
    __metadata("design:paramtypes", [smart_contract_service_1.SmartContractService, milestone_service_1.MilestoneService])
], SmartContractController);
//# sourceMappingURL=smart-contract.controller.js.map