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
exports.CreateInvestorDto = exports.InvestorCriteriaDto = exports.InvestorPreferencesDto = exports.BusinessPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
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
class InvestorPreferencesDto {
}
exports.InvestorPreferencesDto = InvestorPreferencesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Investment sectors of interest', example: ['Tech', 'Finance'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], InvestorPreferencesDto.prototype, "sectors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Regions of interest for investment', example: ['US', 'Europe'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], InvestorPreferencesDto.prototype, "regions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Risk tolerance level', example: 'Medium' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvestorPreferencesDto.prototype, "riskTolerance", void 0);
class InvestorCriteriaDto {
}
exports.InvestorCriteriaDto = InvestorCriteriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum investment amount', example: 10000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InvestorCriteriaDto.prototype, "minInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum investment amount', example: 100000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InvestorCriteriaDto.prototype, "maxInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Investment horizon or timeframe', example: '5 years' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvestorCriteriaDto.prototype, "investmentHorizon", void 0);
class CreateInvestorDto {
}
exports.CreateInvestorDto = CreateInvestorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the investor', example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the investor', example: 'john@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Password for the investor account', example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business plan details',
        type: BusinessPlanDto,
    }),
    __metadata("design:type", BusinessPlanDto)
], CreateInvestorDto.prototype, "businessPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profile status of the investor', example: 'active' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestorDto.prototype, "profileStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preferences for investments', type: InvestorPreferencesDto }),
    __metadata("design:type", InvestorPreferencesDto)
], CreateInvestorDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Investment criteria details', type: InvestorCriteriaDto }),
    __metadata("design:type", InvestorCriteriaDto)
], CreateInvestorDto.prototype, "criteria", void 0);
//# sourceMappingURL=createInvestor.dto.js.map