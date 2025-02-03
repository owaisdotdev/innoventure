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
exports.InvestmentController = void 0;
const startup_service_1 = require("../startup/startup.service");
const smart_contract_service_1 = require("../smart-contract/smart-contract.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const investment_service_1 = require("./investment.service");
const createInvestment_dto_1 = require("../dto/createInvestment.dto");
const updateInvestment_dto_1 = require("../dto/updateInvestment.dto");
const mongoose_1 = require("mongoose");
const investor_service_1 = require("../investor/investor.service");
let InvestmentController = class InvestmentController {
    constructor(investmentService, smartContractService, investorService, startupService) {
        this.investmentService = investmentService;
        this.smartContractService = smartContractService;
        this.investorService = investorService;
        this.startupService = startupService;
    }
    async createInvestment(createInvestmentDto) {
        const contract = await this.smartContractService.findsmartContractById(createInvestmentDto.contractId.toString());
        const investor = await this.investorService.findInvestorById(createInvestmentDto.investorId.toString());
        const startup = await this.startupService.findStartupById(createInvestmentDto.startupId.toString());
        if (!contract) {
            throw new common_1.NotFoundException(`Smart contract with ID ${createInvestmentDto.contractId} not found`);
        }
        if (!investor) {
            throw new common_1.NotFoundException(`Investor with ID ${createInvestmentDto.investorId} not found`);
        }
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${createInvestmentDto.startupId} not found`);
        }
        const updatedDto = {
            ...createInvestmentDto,
            investorId: new mongoose_1.Types.ObjectId(investor._id.toString()),
            startupId: new mongoose_1.Types.ObjectId(startup._id.toString()),
            contractId: new mongoose_1.Types.ObjectId(contract._id.toString()),
        };
        const investment = await this.investmentService.createInvestment(updatedDto);
        await this.smartContractService.addInvestmentTosmartContract(contract._id.toString(), new mongoose_1.Types.ObjectId(investment._id.toString()));
        await this.investorService.addInvestmentToInvestor(investor._id.toString(), new mongoose_1.Types.ObjectId(investment._id.toString()));
        await this.startupService.addInvestorToStartup(startup._id.toString(), new mongoose_1.Types.ObjectId(investor._id.toString()));
        return investment;
    }
    async findAllInvestments() {
        return this.investmentService.findAllInvestments();
    }
    async findInvestmentById(id) {
        const investment = await this.investmentService.findInvestmentById(id);
        if (!investment)
            throw new common_1.NotFoundException(`Investment with ID ${id} not found`);
        return investment;
    }
    async updateInvestment(id, updateInvestmentDto) {
        return this.investmentService.updateInvestment(id, updateInvestmentDto);
    }
    async deleteInvestment(id) {
        return this.investmentService.deleteInvestment(id);
    }
    async findInvestmentsByInvestor(investorId) {
        return this.investmentService.findInvestmentsByInvestor(investorId);
    }
    async findInvestmentsByStartup(startupId) {
        return this.investmentService.findInvestmentsByStartup(startupId);
    }
    async findInvestmentsByContract(contractId) {
        return this.investmentService.findInvestmentsByContract(contractId);
    }
    async findInvestmentsByDate(investmentDate) {
        const date = new Date(investmentDate);
        return this.investmentService.findInvestmentsByDate(date);
    }
};
exports.InvestmentController = InvestmentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new investment' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The investment has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createInvestment_dto_1.CreateInvestmentDto]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "createInvestment", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all investments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a list of investments.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findAllInvestments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Investment ID', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the investment with the given ID.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Investment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findInvestmentById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an investment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Investment ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The investment has been updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Investment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateInvestment_dto_1.UpdateInvestmentDto]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "updateInvestment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an investment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Investment ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The investment has been deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Investment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "deleteInvestment", null);
__decorate([
    (0, common_1.Get)('by-investor/:investorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investments by investor ID' }),
    (0, swagger_1.ApiParam)({ name: 'investorId', description: 'Investor ID', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns investments for the given investor.',
    }),
    __param(0, (0, common_1.Param)('investorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findInvestmentsByInvestor", null);
__decorate([
    (0, common_1.Get)('by-startup/:startupId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investments by startup ID' }),
    (0, swagger_1.ApiParam)({ name: 'startupId', description: 'Startup ID', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns investments for the given startup.',
    }),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findInvestmentsByStartup", null);
__decorate([
    (0, common_1.Get)('by-contract/:contractId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investments by contract ID' }),
    (0, swagger_1.ApiParam)({ name: 'contractId', description: 'Contract ID', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns investments associated with the given contract.',
    }),
    __param(0, (0, common_1.Param)('contractId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findInvestmentsByContract", null);
__decorate([
    (0, common_1.Get)('by-date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get investments by date' }),
    (0, swagger_1.ApiQuery)({
        name: 'investmentDate',
        description: 'Investment date (YYYY-MM-DD)',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns investments made on the specified date.',
    }),
    __param(0, (0, common_1.Query)('investmentDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "findInvestmentsByDate", null);
exports.InvestmentController = InvestmentController = __decorate([
    (0, swagger_1.ApiTags)('Investments'),
    (0, common_1.Controller)('investments'),
    __metadata("design:paramtypes", [investment_service_1.InvestmentService,
        smart_contract_service_1.SmartContractService,
        investor_service_1.InvestorService,
        startup_service_1.StartupService])
], InvestmentController);
//# sourceMappingURL=investment.controller.js.map