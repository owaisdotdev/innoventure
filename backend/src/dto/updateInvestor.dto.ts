import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorDto } from './createInvestor.dto';

export class UpdateInvestorDto extends PartialType(CreateInvestorDto) {
  // Fields are optional for updating
}
