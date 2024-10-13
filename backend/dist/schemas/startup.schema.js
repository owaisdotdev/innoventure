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
exports.StartupSchema = exports.Startup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Startup = class Startup extends mongoose_2.Document {
};
exports.Startup = Startup;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Startup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Startup.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Startup.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            description: { type: String, required: true },
            industry: { type: String, required: true },
            team: { type: [String], required: true },
        },
    }),
    __metadata("design:type", Object)
], Startup.prototype, "businessPlan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalAmount: { type: Number, required: true },
            milestones: [{ type: mongoose_2.Types.ObjectId, ref: 'Milestone' }],
        },
    }),
    __metadata("design:type", Object)
], Startup.prototype, "fundingNeeds", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                docType: { type: String, required: true },
                fileUrl: { type: String, required: true },
            },
        ],
    }),
    __metadata("design:type", Array)
], Startup.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Investor' }] }),
    __metadata("design:type", Array)
], Startup.prototype, "investors", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                milestoneId: { type: mongoose_2.Types.ObjectId, ref: 'Milestone', required: true },
                reportDetails: { type: String, required: true },
                reportDate: { type: Date, required: true },
                status: {
                    type: String,
                    enum: ['On track', 'Delayed'],
                    default: 'On track',
                },
            },
        ],
    }),
    __metadata("design:type", Array)
], Startup.prototype, "progressReports", void 0);
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
], Startup.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "resetCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Startup.prototype, "resetCodeExpiration", void 0);
exports.Startup = Startup = __decorate([
    (0, mongoose_1.Schema)()
], Startup);
exports.StartupSchema = mongoose_1.SchemaFactory.createForClass(Startup);
//# sourceMappingURL=startup.schema.js.map