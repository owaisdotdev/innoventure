"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSmartContractDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createSmartContract_dto_1 = require("./createSmartContract.dto");
class UpdateSmartContractDto extends (0, mapped_types_1.PartialType)(createSmartContract_dto_1.CreateSmartContractDto) {
}
exports.UpdateSmartContractDto = UpdateSmartContractDto;
//# sourceMappingURL=updateSmartContract.dto.js.map