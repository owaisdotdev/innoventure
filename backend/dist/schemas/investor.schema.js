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
exports.InvestorSchema = exports.Investor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Investor = class Investor extends mongoose_2.Document {
};
exports.Investor = Investor;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Investor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Investor.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Investor.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            sectors: { type: [String] },
            regions: { type: [String] },
            riskTolerance: { type: String },
        },
    }),
    __metadata("design:type", Object)
], Investor.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            minInvestment: { type: Number },
            maxInvestment: { type: Number },
            investmentHorizon: { type: String },
        },
    }),
    __metadata("design:type", Object)
], Investor.prototype, "criteria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Investor.prototype, "profileStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Investment' }] }),
    __metadata("design:type", Array)
], Investor.prototype, "investments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: { type: String },
                message: { type: String },
                date: { type: Date },
            },
        ],
    }),
    __metadata("design:type", Array)
], Investor.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Investor.prototype, "resetCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Investor.prototype, "resetCodeExpiration", void 0);
exports.Investor = Investor = __decorate([
    (0, mongoose_1.Schema)()
], Investor);
exports.InvestorSchema = mongoose_1.SchemaFactory.createForClass(Investor);
//# sourceMappingURL=investor.schema.js.map