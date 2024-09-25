import { PartialType } from '@nestjs/mapped-types';
import { CreateStartupDto } from './createStartup.dto';

export class UpdateStartupDto extends PartialType(CreateStartupDto) {
  // Fields are optional for updating
}
