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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSmartContractDto = exports.TermsDto = exports.MilestoneStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
class MilestoneStatusDto {
}
exports.MilestoneStatusDto = MilestoneStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the milestone',
        type: String,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], MilestoneStatusDto.prototype, "milestoneId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the milestone',
        enum: ['Achieved', 'Pending'],
        example: 'Pending',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['Achieved', 'Pending']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MilestoneStatusDto.prototype, "status", void 0);
class TermsDto {
}
exports.TermsDto = TermsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Milestone conditions for the smart contract',
        example: 'Complete phase 1 of project X',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TermsDto.prototype, "milestoneConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Escrow amount tied to the contract',
        example: 5000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TermsDto.prototype, "escrowAmount", void 0);
class CreateSmartContractDto {
}
exports.CreateSmartContractDto = CreateSmartContractDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Investment ID associated with the smart contract (Optional)',
        type: String,
        required: false,
        example: '60c72b2f9b1d8e1a4c8e4b3a',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateSmartContractDto.prototype, "investmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Terms of the smart contract',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TermsDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", TermsDto)
], CreateSmartContractDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Milestone statuses associated with the smart contract',
        type: MilestoneStatusDto,
    }),
    (0, class_transformer_1.Type)(() => MilestoneStatusDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", MilestoneStatusDto)
], CreateSmartContractDto.prototype, "milestoneStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount in escrow for the smart contract',
        example: 10000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSmartContractDto.prototype, "escrowAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the smart contract',
        enum: ['active', 'completed'],
        example: 'active',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['active', 'completed']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSmartContractDto.prototype, "status", void 0);
//# sourceMappingURL=createSmartContract.dto.js.map