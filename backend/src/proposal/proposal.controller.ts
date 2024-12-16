import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from '../dto/createProposal.dto';
import { UpdateProposalDto } from '../dto/updateProposal.dto';
import { Proposal } from '../schemas/proposal.schema';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new proposal' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Proposal has been successfully created',
    type: Proposal,
  })
  @ApiBody({ type: CreateProposalDto })
  async createProposal(
    @Body() createProposalDto: CreateProposalDto,
  ): Promise<Proposal> {
    return this.proposalService.createProposal(createProposalDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a proposal by ID' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proposal found',
    type: Proposal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proposal not found',
  })
  async getProposal(@Param('id') id: string): Promise<Proposal> {
    return this.proposalService.getProposalById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all proposals or filter by status' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'accepted', 'rejected'],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of proposals',
    type: [Proposal],
  })
  async getProposals(@Query('status') status?: string): Promise<Proposal[]> {
    if (status) {
      return this.proposalService.getProposalsByStatus(status);
    }
    return this.proposalService.getAllProposals();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiBody({ type: UpdateProposalDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proposal updated successfully',
    type: Proposal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proposal not found',
  })
  async updateProposal(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ): Promise<Proposal> {
    return this.proposalService.updateProposal(id, updateProposalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proposal deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proposal not found',
  })
  async deleteProposal(@Param('id') id: string): Promise<void> {
    return this.proposalService.deleteProposal(id);
  }

  @Patch(':id/escrow')
  @ApiOperation({ summary: 'Update escrow status' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        releaseDate: { type: 'string', format: 'date-time' },
        status: { type: 'string', enum: ['In escrow', 'Released'] },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Escrow status updated successfully',
    type: Proposal,
  })
  async updateEscrowStatus(
    @Param('id') id: string,
    @Body() escrowStatus: Partial<Proposal['escrowStatus']>,
  ): Promise<Proposal> {
    return this.proposalService.updateEscrowStatus(id, escrowStatus);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Accept or reject proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['accepted', 'rejected'],
          description: 'New status of the proposal',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proposal status updated successfully',
    type: Proposal,
  })
  async changeProposalStatus(
    @Param('id') id: string,
    @Body('status') status: 'accepted' | 'rejected',
  ): Promise<Proposal> {
    return this.proposalService.changeProposalStatus(id, status);
  }
}

