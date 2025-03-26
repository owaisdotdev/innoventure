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
exports.SmartContractService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const smartContract_schema_1 = require("../schemas/smartContract.schema");
const startup_schema_1 = require("../schemas/startup.schema");
let SmartContractService = class SmartContractService {
    findSmartContractById(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(smartContractModel, startupModel) {
        this.smartContractModel = smartContractModel;
        this.startupModel = startupModel;
    }
    async createsmartContract(createSmartContractDto) {
        if (!createSmartContractDto?.milestoneStatus?.milestoneId) {
            throw new common_1.BadRequestException('milestone is required');
        }
        const { milestoneStatus, ...rest } = createSmartContractDto;
        const smartContractData = {
            ...rest,
            milestoneStatus: {
                milestoneId: new mongoose_2.Types.ObjectId(milestoneStatus.milestoneId),
                status: milestoneStatus.status
            },
        };
        const createdsmartContract = new this.smartContractModel(smartContractData);
        return createdsmartContract.save();
    }
    async findAllsmartContracts() {
        return this.smartContractModel.find().exec();
    }
    async findsmartContractById(smartContractId) {
        if (!(0, mongoose_2.isValidObjectId)(smartContractId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const smartContract = await this.smartContractModel
            .findById(smartContractId)
            .exec();
        if (!smartContract) {
            throw new common_1.NotFoundException('smartContract not found');
        }
        return smartContract;
    }
    async updatesmartContract(smartContractId, updatesmartContractDto) {
        if (!(0, mongoose_2.isValidObjectId)(smartContractId)) {
            throw new common_1.BadRequestException(`Invalid ID format`);
        }
        const updatedsmartContract = await this.smartContractModel
            .findByIdAndUpdate(smartContractId, { $set: updatesmartContractDto }, { new: true })
            .exec();
        if (!updatedsmartContract) {
            throw new common_1.NotFoundException('smartContract not found');
        }
        return updatedsmartContract;
    }
    async addInvestmentTosmartContract(smartContractId, investmentId) {
        const result = await this.smartContractModel
            .updateOne({ _id: smartContractId }, {
            $set: { 'investmentId': investmentId },
        })
            .exec();
        if (result.modifiedCount === 0) {
            throw new common_1.NotFoundException(`Smart contract with ID ${smartContractId} not found`);
        }
    }
    async findByStatus(status) {
        return this.smartContractModel.find({ status }).exec();
    }
    async findByInvestmentId(investmentId) {
        return this.smartContractModel.find({ investmentId }).exec();
    }
};
exports.SmartContractService = SmartContractService;
exports.SmartContractService = SmartContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(smartContract_schema_1.SmartContract.name)),
    __param(1, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SmartContractService);
//# sourceMappingURL=smart-contract.service.js.map