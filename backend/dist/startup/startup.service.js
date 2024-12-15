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
exports.StartupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const startup_schema_1 = require("../schemas/startup.schema");
const bcrypt = require("bcryptjs");
let StartupService = class StartupService {
    constructor(startupModel) {
        this.startupModel = startupModel;
    }
    async createStartup(createStartupDto) {
        try {
            const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);
            const createdStartup = await this.startupModel.create({
                ...createStartupDto,
                password: hashedPassword,
            });
            return createdStartup;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create startup');
        }
    }
    async findAllStartups() {
        return this.startupModel.find().exec();
    }
    async findStartupById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const startup = await this.startupModel.findById(id).exec();
        if (!startup) {
            throw new common_1.NotFoundException(`Startup not found`);
        }
        return startup;
    }
    async findByEmail(email) {
        return this.startupModel.findOne({ email }).exec();
    }
    async updateStartup(id, updateStartupDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const updatedStartup = await this.startupModel
            .findByIdAndUpdate(id, { $set: updateStartupDto }, { new: true })
            .exec();
        if (!updatedStartup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return updatedStartup;
    }
    async addMilestoneToStartup(startupId, milestoneId) {
        const result = await this.startupModel
            .updateOne({ _id: startupId }, { $push: { 'fundingNeeds.milestones': milestoneId } })
            .exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
    }
    async addInvestorToStartup(startupId, investorId) {
        const result = await this.startupModel
            .updateOne({ _id: startupId }, { $push: { investors: investorId } })
            .exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
    }
    async removeMilestoneFromStartup(startupId, milestoneId) {
        const result = await this.startupModel
            .updateOne({ _id: startupId }, { $pull: { 'fundingNeeds.milestones': milestoneId } })
            .exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
    }
    async deleteStartup(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const result = await this.startupModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Startup not found`);
        }
        return true;
    }
    async findByIndustry(industry) {
        return this.startupModel.find({ 'businessPlan.industry': industry }).exec();
    }
    async getRecentStartups(days = 30) {
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        return this.startupModel
            .find({
            createdAt: { $gte: dateFrom },
        })
            .exec();
    }
    async findFydpStartups() {
        return this.startupModel.find({ isFydp: true }).exec();
    }
};
exports.StartupService = StartupService;
exports.StartupService = StartupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StartupService);
//# sourceMappingURL=startup.service.js.map