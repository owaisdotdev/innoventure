"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvestmentDto = void 0;
const createInvestment_dto_1 = require("./createInvestment.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateInvestmentDto extends (0, mapped_types_1.PartialType)(createInvestment_dto_1.CreateInvestmentDto) {
}
exports.UpdateInvestmentDto = UpdateInvestmentDto;
//# sourceMappingURL=updateInvestment.dto.js.map