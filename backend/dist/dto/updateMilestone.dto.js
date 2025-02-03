"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMilestoneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createMilestone_dto_1 = require("./createMilestone.dto");
class UpdateMilestoneDto extends (0, mapped_types_1.PartialType)(createMilestone_dto_1.CreateMilestoneDto) {
}
exports.UpdateMilestoneDto = UpdateMilestoneDto;
//# sourceMappingURL=updateMilestone.dto.js.map