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
exports.MilestoneService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const milestone_schema_1 = require("../schemas/milestone.schema");
const startup_schema_1 = require("../schemas/startup.schema");
let MilestoneService = class MilestoneService {
    constructor(milestoneModel, startupModel) {
        this.milestoneModel = milestoneModel;
        this.startupModel = startupModel;
    }
    async createMilestone(createMilestoneDto) {
        if (createMilestoneDto.associatedSmartContractId) {
            const { associatedSmartContractId, ...rest } = createMilestoneDto;
            const milestoneData = {
                ...rest,
                associatedSmartContractId: new mongoose_2.Types.ObjectId(associatedSmartContractId),
            };
            const createdMilestone = new this.milestoneModel(milestoneData);
            return createdMilestone.save();
        }
        else {
            const createdMilestone = new this.milestoneModel(createMilestoneDto);
            return createdMilestone.save();
        }
    }
    async findAllMilestones() {
        return this.milestoneModel.find().exec();
    }
    async findMilestoneById(milestoneId) {
        if (!(0, mongoose_2.isValidObjectId)(milestoneId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const milestone = await this.milestoneModel.findById(milestoneId).exec();
        if (!milestone) {
            throw new common_1.NotFoundException('milestone not found');
        }
        return milestone;
    }
    async updateMilestone(milestoneId, updatemilestoneDto) {
        if (!(0, mongoose_2.isValidObjectId)(milestoneId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const updatedmilestone = await this.milestoneModel
            .findByIdAndUpdate(milestoneId, { $set: updatemilestoneDto }, { new: true })
            .exec();
        if (!updatedmilestone) {
            throw new common_1.NotFoundException('milestone not found');
        }
        return updatedmilestone;
    }
    async addSmartContractToMilestone(milestonId, smartContractId) {
        const result = await this.milestoneModel.updateOne({ _id: milestonId }, { $set: { 'associatedSmartContractId': smartContractId } }).exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Milestone with ID ${milestonId} not found`);
        }
    }
    async deleteMilestone(milestoneId) {
        if (!(0, mongoose_2.isValidObjectId)(milestoneId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        await this.startupModel.updateOne({ 'fundingNeeds.milestones': milestoneId }, { $pull: { 'fundingNeeds.milestones': milestoneId } });
        const result = await this.milestoneModel
            .findByIdAndDelete(milestoneId)
            .exec();
        if (!result) {
            throw new common_1.NotFoundException('milestone not found');
        }
        return true;
    }
    async findByStatus(status) {
        return this.milestoneModel.find({ status }).exec();
    }
    async findByTitle(title) {
        return this.milestoneModel.find({ title }).exec();
    }
    async findBySmartContract(associatedSmartContractId) {
        if (!mongoose_2.Types.ObjectId.isValid(associatedSmartContractId)) {
            throw new common_1.BadRequestException('Invalid Smart Contract ID format');
        }
        const objectId = new mongoose_2.Types.ObjectId(associatedSmartContractId);
        return this.milestoneModel.find({ associatedSmartContractId: objectId }).exec();
    }
};
exports.MilestoneService = MilestoneService;
exports.MilestoneService = MilestoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(milestone_schema_1.Milestone.name)),
    __param(1, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MilestoneService);
//# sourceMappingURL=milestone.service.js.map