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
const milestone_schema_1 = require("./milestone.schema");
const axios_1 = require("axios");
const mongoose_3 = require("mongoose");
let MilestoneService = class MilestoneService {
    constructor(milestoneModel) {
        this.milestoneModel = milestoneModel;
    }
    async uploadToPinata(file) {
        const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname);
        const response = await axios_1.default.post(url, formData, {
            headers: {
                'pinata_api_key': process.env.PINATA_API_KEY,
                'pinata_secret_api_key': process.env.PINATA_API_SECRET,
                'Content-Type': 'multipart/form-data',
            },
        });
        return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    }
    async analyzeWithGemini(file) {
        const apiKey = process.env.GEMINI_API_KEY;
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        const fileContent = file.buffer.toString('base64');
        const response = await axios_1.default.post(url, {
            contents: [{ parts: [{ text: `Analyze this financial report: ${fileContent}` }] }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.candidates[0].content.parts[0].text;
    }
    async submitMilestone(data, file) {
        const fileUrl = await this.uploadToPinata(file);
        const financialAnalysis = await this.analyzeWithGemini(file);
        const milestone = new this.milestoneModel({
            ...data,
            fileUrl,
            financialAnalysis,
            submittedAt: new Date(),
            smartContractIds: [],
        });
        return milestone.save();
    }
    async findMilestoneById(id) {
        if (!mongoose_3.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid Milestone ID format');
        }
        const milestone = await this.milestoneModel.findById(id).exec();
        if (!milestone) {
            throw new Error('Milestone not found');
        }
        return milestone;
    }
    async addSmartContractToMilestone(milestoneId, smartContractId) {
        if (!mongoose_3.Types.ObjectId.isValid(milestoneId)) {
            throw new Error('Invalid Milestone ID format');
        }
        const milestone = await this.milestoneModel.findById(milestoneId).exec();
        if (!milestone) {
            throw new Error('Milestone not found');
        }
        milestone.smartContractIds = milestone.smartContractIds || [];
        milestone.smartContractIds.push(smartContractId);
        return milestone.save();
    }
    async findMilestones(filter = {}) {
        return this.milestoneModel.find(filter).exec();
    }
    async updateMilestoneStatus(id, status) {
        if (!mongoose_3.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid Milestone ID format');
        }
        const milestone = await this.milestoneModel.findById(id).exec();
        if (!milestone) {
            throw new Error('Milestone not found');
        }
        milestone.status = status;
        return milestone.save();
    }
};
exports.MilestoneService = MilestoneService;
exports.MilestoneService = MilestoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(milestone_schema_1.MilestoneModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MilestoneService);
//# sourceMappingURL=milestone.service.js.map