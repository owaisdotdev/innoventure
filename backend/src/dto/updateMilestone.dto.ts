import { PartialType } from '@nestjs/mapped-types';
import { CreateMilestoneDto } from './createMilestone.dto';

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {
  // Fields are optional for updating
}
