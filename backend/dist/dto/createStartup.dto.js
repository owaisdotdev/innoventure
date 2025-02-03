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
exports.CreateStartupDto = exports.FydpDetailsDto = exports.BusinessPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
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
class FydpDetailsDto {
}
exports.FydpDetailsDto = FydpDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'University where the FYDP was conducted',
        example: 'University of Lahore',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FydpDetailsDto.prototype, "university", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Year of the FYDP',
        example: 2023,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FydpDetailsDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supervisor overseeing the FYDP',
        example: 'Dr. Ali Khan',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FydpDetailsDto.prototype, "supervisorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GitHub repository URL for the FYDP (optional)',
        example: 'https://github.com/username/fydp',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FydpDetailsDto.prototype, "githubRepoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags for categorizing the FYDP',
        example: ['IoT', 'Automation', 'Agriculture'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FydpDetailsDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional remarks or notes',
        example: 'This project was a finalist in the National Competition.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FydpDetailsDto.prototype, "remarks", void 0);
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
    (0, swagger_1.ApiProperty)({
        description: 'Indicates whether the entity is an FYDP',
        example: true,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateStartupDto.prototype, "isFydp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'FYDP-specific details',
        type: FydpDetailsDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FydpDetailsDto),
    __metadata("design:type", FydpDetailsDto)
], CreateStartupDto.prototype, "fydpDetails", void 0);
//# sourceMappingURL=createStartup.dto.js.map