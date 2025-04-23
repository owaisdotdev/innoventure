import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ProposalsService } from './proposal.service'; // Correct path assumed
// import { NotificationService } from '../notification/notification.service'; // Import NotificationService
import { NotificationsService } from 'src/notification/notification.service';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Proposal } from './schemas/proposal.schema';
import { UpdateProposalDto } from './dtos/update-proposal.dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  async create(@Body() createProposalDto: CreateProposalDto) {
    return this.proposalsService.create(createProposalDto);
  }

  @Get('startup/:startupId')
  async findByStartupId(@Param('startupId') startupId: string) {
    return this.proposalsService.findByStartupId(startupId);
  }

  @Get('investor/:investorId')
  async findByInvestorId(@Param('investorId') investorId: string) {
    return this.proposalsService.findByInvestorId(investorId);
  }

  @Patch(':id')
  async updateProposal(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return this.proposalsService.updateProposal(id, updateProposalDto);
  }
}
