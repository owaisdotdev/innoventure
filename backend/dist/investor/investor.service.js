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
exports.InvestorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const investor_schema_1 = require("../schemas/investor.schema");
const bcrypt = require("bcryptjs");
let InvestorService = class InvestorService {
    constructor(investorModel) {
        this.investorModel = investorModel;
    }
    async createInvestor(createInvestorDto) {
        const hashedPassword = await bcrypt.hash(createInvestorDto.password, 10);
        const createdInvestor = await this.investorModel.create({
            ...createInvestorDto,
            password: hashedPassword,
        });
        return createdInvestor;
    }
    async findAllInvestors() {
        return this.investorModel.find().exec();
    }
    async findInvestorById(investorId) {
        if (!(0, mongoose_2.isValidObjectId)(investorId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const investor = await this.investorModel.findById(investorId).exec();
        if (!investor) {
            throw new common_1.NotFoundException('Investor not found');
        }
        return investor;
    }
    async findByEmail(email) {
        return this.investorModel.findOne({ email }).exec();
    }
    async updateInvestor(investorId, updateInvestorDto) {
        if (!(0, mongoose_2.isValidObjectId)(investorId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const updatedInvestor = await this.investorModel
            .findByIdAndUpdate(investorId, { $set: updateInvestorDto }, { new: true })
            .exec();
        if (!updatedInvestor) {
            throw new common_1.NotFoundException('Investor not found');
        }
        return updatedInvestor;
    }
    async addInvestmentToInvestor(investorId, investmentId) {
        const result = await this.investorModel
            .updateOne({ _id: investorId }, {
            $push: { 'investments': investmentId },
        })
            .exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Investor with ID ${investorId} not found`);
        }
    }
    async deleteInvestor(investorId) {
        if (!(0, mongoose_2.isValidObjectId)(investorId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const result = await this.investorModel
            .findByIdAndDelete(investorId)
            .exec();
        if (!result) {
            throw new common_1.NotFoundException('Investor not found');
        }
        return true;
    }
    async findBySector(sector) {
        return this.investorModel.find({ 'preferences.sectors': sector }).exec();
    }
    async findByRegion(region) {
        return this.investorModel.find({ 'preferences.regions': region }).exec();
    }
    async findByRiskTolerance(riskTolerance) {
        return this.investorModel
            .find({ 'preferences.riskTolerance': riskTolerance })
            .exec();
    }
    async findByMinInvestment(minInvestment) {
        return this.investorModel
            .find({ 'criteria.minInvestment': { $gte: minInvestment } })
            .exec();
    }
    async findByMaxInvestment(maxInvestment) {
        return this.investorModel
            .find({ 'criteria.maxInvestment': { $lte: maxInvestment } })
            .exec();
    }
    async findByInvestmentRange(minInvestment, maxInvestment) {
        return this.investorModel
            .find({
            'criteria.minInvestment': { $lte: maxInvestment },
            'criteria.maxInvestment': { $gte: minInvestment },
        })
            .exec();
    }
    async findByProfileStatus(profileStatus) {
        return this.investorModel.find({ profileStatus }).exec();
    }
};
exports.InvestorService = InvestorService;
exports.InvestorService = InvestorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(investor_schema_1.Investor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InvestorService);
//# sourceMappingURL=investor.service.js.map