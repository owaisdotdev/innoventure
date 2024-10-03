import { CreateInvestmentDto } from './createInvestment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {
  // Fields are optional for updating
}
