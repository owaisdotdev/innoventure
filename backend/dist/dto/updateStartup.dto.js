"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStartupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createStartup_dto_1 = require("./createStartup.dto");
class UpdateStartupDto extends (0, mapped_types_1.PartialType)(createStartup_dto_1.CreateStartupDto) {
}
exports.UpdateStartupDto = UpdateStartupDto;
//# sourceMappingURL=updateStartup.dto.js.map