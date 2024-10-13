"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvestorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createInvestor_dto_1 = require("./createInvestor.dto");
class UpdateInvestorDto extends (0, mapped_types_1.PartialType)(createInvestor_dto_1.CreateInvestorDto) {
}
exports.UpdateInvestorDto = UpdateInvestorDto;
//# sourceMappingURL=updateInvestor.dto.js.map