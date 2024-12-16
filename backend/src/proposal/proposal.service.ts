import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProposalDto } from '../dto/createProposal.dto';
import { UpdateProposalDto } from '../dto/updateProposal.dto';
import { Proposal } from '../schemas/proposal.schema';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private readonly ProposalModel: Model<Proposal>,
  ) {}

  // Create a new proposal
  async createProposal(
    createProposalDto: CreateProposalDto,
  ): Promise<Proposal> {
    const newProposal = new this.ProposalModel(createProposalDto);
    return newProposal.save();
  }

  // Get a single proposal by ID
  async getProposalById(id: string): Promise<Proposal> {
    const proposal = await this.ProposalModel.findById(id).exec();
    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }
    return proposal;
  }

  // Get all proposals
  async getAllProposals(): Promise<Proposal[]> {
    return this.ProposalModel.find().exec();
  }

  // Update a proposal by ID
  async updateProposal(
    id: string,
    updateProposalDto: UpdateProposalDto,
  ): Promise<Proposal> {
    const updatedProposal = await this.ProposalModel
      .findByIdAndUpdate(id, updateProposalDto, { new: true })
      .exec();

    if (!updatedProposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }
    return updatedProposal;
  }

  // Delete a proposal by ID
  async deleteProposal(id: string): Promise<void> {
    const result = await this.ProposalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }
  }

  // Get proposals by status
  async getProposalsByStatus(status: string): Promise<Proposal[]> {
    return this.ProposalModel.find({ status }).exec();
  }

  // Update escrow status of a proposal
  async updateEscrowStatus(
    id: string,
    escrowStatus: Partial<Proposal['escrowStatus']>,
  ): Promise<Proposal> {
    const proposal = await this.getProposalById(id);
    proposal.escrowStatus = { ...proposal.escrowStatus, ...escrowStatus };
    return proposal.save();
  }

  // Accept or reject a proposal
  async changeProposalStatus(
    id: string,
    status: 'accepted' | 'rejected',
  ): Promise<Proposal> {
    return this.updateProposal(id, { status });
  }
}
