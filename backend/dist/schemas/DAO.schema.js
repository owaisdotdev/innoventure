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
exports.DAOSchema = exports.DAO = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DAO = class DAO extends mongoose_2.Document {
};
exports.DAO = DAO;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DAO.prototype, "proposalId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DAO.prototype, "proposalDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                investorId: { type: mongoose_2.Types.ObjectId, ref: 'Investor', required: true },
                vote: { type: String, enum: ['For', 'Against'], required: true },
            },
        ],
        required: true,
    }),
    __metadata("design:type", Array)
], DAO.prototype, "votes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Approved', 'Rejected'], required: true }),
    __metadata("design:type", String)
], DAO.prototype, "outcome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], DAO.prototype, "date", void 0);
exports.DAO = DAO = __decorate([
    (0, mongoose_1.Schema)()
], DAO);
exports.DAOSchema = mongoose_1.SchemaFactory.createForClass(DAO);
//# sourceMappingURL=DAO.schema.js.map