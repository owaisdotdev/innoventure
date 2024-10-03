import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartContractDto } from './createSmartContract.dto';

export class UpdateSmartContractDto extends PartialType(CreateSmartContractDto) {
  // Fields are optional for updating
}
