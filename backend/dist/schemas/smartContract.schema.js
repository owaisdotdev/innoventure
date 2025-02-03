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
exports.SmartContractSchema = exports.SmartContract = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let SmartContract = class SmartContract extends mongoose_2.Document {
};
exports.SmartContract = SmartContract;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Investment' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SmartContract.prototype, "investmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            milestoneConditions: { type: String, required: true },
            escrowAmount: { type: Number, required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], SmartContract.prototype, "terms", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            milestoneId: { type: mongoose_2.Types.ObjectId, ref: 'Milestone', required: true },
            status: { type: String, enum: ['Achieved', 'Pending'], required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], SmartContract.prototype, "milestoneStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SmartContract.prototype, "escrowAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['active', 'completed'], required: true }),
    __metadata("design:type", String)
], SmartContract.prototype, "status", void 0);
exports.SmartContract = SmartContract = __decorate([
    (0, mongoose_1.Schema)()
], SmartContract);
exports.SmartContractSchema = mongoose_1.SchemaFactory.createForClass(SmartContract);
//# sourceMappingURL=smartContract.schema.js.map