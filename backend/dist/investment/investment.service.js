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
exports.InvestmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const investment_schema_1 = require("../schemas/investment.schema");
let InvestmentService = class InvestmentService {
    constructor(investmentModel) {
        this.investmentModel = investmentModel;
    }
    async createInvestment(createInvestmentDto) {
        const newInvestment = new this.investmentModel(createInvestmentDto);
        return newInvestment.save();
    }
    async findAllInvestments() {
        return this.investmentModel.find().exec();
    }
    async findInvestmentById(id) {
        const investment = await this.investmentModel.findById(id).exec();
        if (!investment) {
            throw new common_1.NotFoundException(`Investment with ID ${id} not found`);
        }
        return investment;
    }
    async updateInvestment(id, updateInvestmentDto) {
        const updatedInvestment = await this.investmentModel
            .findByIdAndUpdate(id, updateInvestmentDto, { new: true })
            .exec();
        if (!updatedInvestment) {
            throw new common_1.NotFoundException(`Investment with ID ${id} not found`);
        }
        return updatedInvestment;
    }
    async deleteInvestment(id) {
        const result = await this.investmentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Investment with ID ${id} not found`);
        }
    }
    async findInvestmentsByInvestor(investorId) {
        return this.investmentModel.find({ investorId }).exec();
    }
    async findInvestmentsByStartup(startupId) {
        return this.investmentModel.find({ startupId }).exec();
    }
    async findInvestmentsByContract(contractId) {
        return this.investmentModel
            .find({ 'contractDetails.contractId': contractId })
            .exec();
    }
    async findInvestmentsByDate(investmentDate) {
        return this.investmentModel.find({ investmentDate }).exec();
    }
    async getRecentInvestments(days = 30) {
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        return this.investmentModel
            .find({
            investmentDate: { $gte: dateFrom },
        })
            .exec();
    }
    async getRecentInvestmentsWithDetails() {
        return this.investmentModel
            .find()
            .sort({ investmentDate: -1 })
            .limit(10)
            .populate('investorId', 'name email')
            .populate('startupId', 'name industry')
            .exec();
    }
    async findInvestmentsByStatus(status) {
        return this.investmentModel.find({ status }).exec();
    }
    async updateInvestmentStatus(investmentId, status) {
        return this.investmentModel
            .findByIdAndUpdate(investmentId, { status }, { new: true })
            .exec();
    }
};
exports.InvestmentService = InvestmentService;
exports.InvestmentService = InvestmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(investment_schema_1.Investment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InvestmentService);
//# sourceMappingURL=investment.service.js.map