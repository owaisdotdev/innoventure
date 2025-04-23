import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './schemas/proposal.schema';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import { UpdateProposalDto } from './dtos/update-proposal.dto';

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
      throw new InternalServerErrorException('Failed to save proposal.', error);
    }
  }

  async findByStartupId(startupId: string): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalModel.find({ startupId }).exec();
      if (!proposals.length) {
        throw new NotFoundException('No proposals found for this startup.');
      }
      return proposals;
    } catch (error) {
      throw error;
    }
  }

  async findByInvestorId(investorId: string): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalModel.find({ investorId }).exec();
      if (!proposals.length) {
        throw new NotFoundException('No proposals found for this investor.');
      }
      return proposals;
    } catch (error) {
      throw error;
    }
  }

  async updateProposal(id: string, updateProposalDto: UpdateProposalDto): Promise<Proposal> {
    try {
      const updatedProposal = await this.proposalModel.findByIdAndUpdate(
        id,
        { $set: updateProposalDto },
        { new: true }
      );
      if (!updatedProposal) {
        throw new NotFoundException('Proposal not found.');
      }
      return updatedProposal;
    } catch (error) {
      console.error('Error updating proposal:', error.message, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update proposal.', error);
    }
  }
}
