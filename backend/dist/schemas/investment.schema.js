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
exports.InvestmentSchema = exports.Investment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Investment = class Investment extends mongoose_2.Document {
};
exports.Investment = Investment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Investor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "investorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Investment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            equity: { type: Number, required: true },
            conditions: { type: String, required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Investment.prototype, "terms", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            amount: { type: Number, required: true },
            releaseDate: { type: Date, required: true },
            status: { type: String, enum: ['In escrow', 'Released'], required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Investment.prototype, "escrowStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "contractId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Investment.prototype, "equityDistribution", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Investment.prototype, "investmentDate", void 0);
exports.Investment = Investment = __decorate([
    (0, mongoose_1.Schema)()
], Investment);
exports.InvestmentSchema = mongoose_1.SchemaFactory.createForClass(Investment);
//# sourceMappingURL=investment.schema.js.map