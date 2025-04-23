import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './schemas/proposal.schema';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import { UpdateProposalDto } from './dtos/update-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<Proposal>,
  ) {}

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
    return this.proposalModel.find({ startupId }).populate('investorId').populate('startupId').exec();
  }

  async findByInvestorId(investorId: string): Promise<Proposal[]> {
    return this.proposalModel.find({ investorId }).populate('investorId').populate('startupId').exec();
  }

  async updateProposal(
    id: string,
    updateProposalDto: UpdateProposalDto,
  ): Promise<Proposal> {
    try {
      const updatedProposal = await this.proposalModel.findByIdAndUpdate(
        id,
        { $set: updateProposalDto },
        { new: true },
      );
      if (!updatedProposal) {
        throw new Error('Proposal not found');
      }
      return updatedProposal;
    } catch (error) {
      console.error('Error updating proposal:', error.message, error.stack);
      throw error;
    }
  }
}
