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
exports.CreateInvestmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
class TermsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentage of equity',
        type: Number,
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TermsDto.prototype, "equity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conditions of the investment',
        type: String,
        example: 'Investor holds 10% equity with no voting rights',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TermsDto.prototype, "conditions", void 0);
class EscrowStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount held in escrow',
        type: Number,
        example: 25000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EscrowStatusDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the escrow amount will be released',
        type: Date,
        example: '2024-12-31T00:00:00.000Z',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EscrowStatusDto.prototype, "releaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the escrow funds',
        enum: ['In escrow', 'Released'],
        example: 'In escrow',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['In escrow', 'Released']),
    __metadata("design:type", String)
], EscrowStatusDto.prototype, "status", void 0);
class CreateInvestmentDto {
}
exports.CreateInvestmentDto = CreateInvestmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the investor',
        type: String,
        example: '60c72b2f9b1e8a5b6cddc9e1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInvestmentDto.prototype, "investorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the startup',
        type: String,
        example: '60c72b2f9b1e8a5b6cddc9e2',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInvestmentDto.prototype, "startupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount invested',
        type: Number,
        example: 50000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInvestmentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Terms of the investment',
        type: TermsDto,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TermsDto),
    __metadata("design:type", TermsDto)
], CreateInvestmentDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Escrow status details',
        type: EscrowStatusDto,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EscrowStatusDto),
    __metadata("design:type", EscrowStatusDto)
], CreateInvestmentDto.prototype, "escrowStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the associated smart contract',
        type: String,
        example: '60c72b2f9b1e8a5b6cddc9e3',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInvestmentDto.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentage of equity held',
        type: Number,
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInvestmentDto.prototype, "equityDistribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Investment date',
        type: Date,
        example: '2024-01-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateInvestmentDto.prototype, "investmentDate", void 0);
//# sourceMappingURL=createInvestment.dto.js.map