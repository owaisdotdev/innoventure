import { Injectable, NotFoundException, InternalServerErrorException, Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './schemas/proposal.schema';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import { UpdateProposalDto } from './dtos/update-proposal.dto';
import { ProposalsService } from './proposal.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  async create(@Body() createProposalDto: CreateProposalDto): Promise<Proposal> {
    return this.proposalsService.create(createProposalDto);
  }

  @Get('startup/:startupId')
  async findByStartupId(@Param('startupId') startupId: string): Promise<Proposal[]> {
    return this.proposalsService.findByStartupId(startupId);
  }

  @Get('investor/:investorId')
  async findByInvestorId(@Param('investorId') investorId: string): Promise<Proposal[]> {
    return this.proposalsService.findByInvestorId(investorId);
  }

  @Patch(':id')
  async updateProposal(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto
  ): Promise<Proposal> {
    return this.proposalsService.updateProposal(id, updateProposalDto);
  }
  
}

