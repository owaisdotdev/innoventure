import { PartialType } from '@nestjs/mapped-types';
import { CreateProposalDto } from './createProposal.dto';

export class UpdateProposalDto extends PartialType(CreateProposalDto) {
  // Fields are optional for updating
}
