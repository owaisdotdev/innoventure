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
exports.CreateStartupDto = exports.FundingNeedsDto = exports.BusinessPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class BusinessPlanDto {
}
exports.BusinessPlanDto = BusinessPlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the business plan',
        example: 'Our business plan focuses on revolutionizing tech solutions',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BusinessPlanDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The industry the startup operates in',
        example: 'Tech',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BusinessPlanDto.prototype, "industry", void 0);
class FundingNeedsDto {
}
exports.FundingNeedsDto = FundingNeedsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total funding required for the startup',
        example: 100000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FundingNeedsDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of milestones for the startup',
        type: [mongoose_1.Types.ObjectId],
    }),
    __metadata("design:type", Array)
], FundingNeedsDto.prototype, "milestones", void 0);
class CreateStartupDto {
}
exports.CreateStartupDto = CreateStartupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the startup',
        example: 'Startup Co',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStartupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the startup',
        example: 'startup@example.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStartupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password for the startup account',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStartupDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business plan details',
        type: BusinessPlanDto,
    }),
    __metadata("design:type", BusinessPlanDto)
], CreateStartupDto.prototype, "businessPlan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Business plan details',
        type: FundingNeedsDto,
    }),
    __metadata("design:type", FundingNeedsDto)
], CreateStartupDto.prototype, "fundingNeeds", void 0);
//# sourceMappingURL=createStartup.dto.js.map