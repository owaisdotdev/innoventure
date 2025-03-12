import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './schemas/proposal.schema';
import { CreateProposalDto } from './dtos/create-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(@InjectModel(Proposal.name) private proposalModel: Model<Proposal>) {}

  async create(createProposalDto: CreateProposalDto): Promise<Proposal> {
    try {
      const createdProposal = new this.proposalModel({
        ...createProposalDto,
        status: 'pending',
      });
      console.log('Saving proposal:', createdProposal);
      return await createdProposal.save();
    } catch (error) {
      console.error('Error saving proposal:', error.message, error.stack);
      throw error;
    }
  }

  async findByStartupId(startupId: string): Promise<Proposal[]> {
    return this.proposalModel.find({ startupId }).exec();
  }
}
