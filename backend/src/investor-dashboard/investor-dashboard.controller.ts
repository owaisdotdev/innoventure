import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { InvestorDashboardService } from './investor-dashboard.service';

@ApiTags('Investor Dashboard')
@Controller('investor-dashboard')
export class InvestorDashboardController {
  constructor(
    private readonly investorDashboardService: InvestorDashboardService,
  ) {}

  @ApiOperation({ summary: 'Get total investment made by an investor' })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiResponse({
    status: 200,
    description: 'Total investment amount',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number' },
      },
    },
  })
  @Get(':investorId/total-investment')
  async getTotalInvestment(
    @Param('investorId') investorId: string,
  ): Promise<{ total: number }> {
    const total =
      await this.investorDashboardService.getTotalInvestment(investorId);
    return { total };
  }

  @ApiOperation({
    summary: 'Get the number of active startups an investor invested in',
  })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiResponse({
    status: 200,
    description: 'Number of active projects',
    schema: {
      type: 'object',
      properties: {
        activeProjects: { type: 'number' },
      },
    },
  })
  @Get(':investorId/active-projects')
  async getActiveStartups(
    @Param('investorId') investorId: string,
  ): Promise<{ activeProjects: number }> {
    const activeProjects =
      await this.investorDashboardService.getActiveStartups(investorId);
    return { activeProjects }; // Wrap in an object
  }

  @ApiOperation({ summary: 'Get total returns for an investor' })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiResponse({
    status: 200,
    description: 'Total returns calculated from equity distribution',
    schema: {
      type: 'object',
      properties: {
        totalReturns: { type: 'number' },
      },
    },
  })
  @Get(':investorId/total-returns')
  async getTotalReturns(
    @Param('investorId') investorId: string,
  ): Promise<{ totalReturns: number }> {
    const totalReturns =
      await this.investorDashboardService.getTotalReturns(investorId);
    return { totalReturns }; // Wrap in an object
  }

  @ApiOperation({ summary: 'Get recent activity of an investor' })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of recent activities to fetch (default: 10)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of recent activities',
    type: [Object],
  })
  @Get(':investorId/recent-activity')
  async getRecentActivity(
    @Param('investorId') investorId: string,
    @Query('limit') limit?: number,
  ): Promise<{ type: string; message: string; date: Date }[]> {
    return this.investorDashboardService.getRecentActivity(
      investorId,
      limit || 10,
    );
  }

  @ApiOperation({ summary: 'Get active investments of an investor' })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiResponse({
    status: 200,
    description: 'List of active investments',
    type: [Object],
  })
  @Get(':investorId/portfolio')
  async getActiveInvestments(@Param('investorId') investorId: string): Promise<
    {
      startupName: string;
      amount: number;
      status: string;
    }[]
  > {
    return this.investorDashboardService.getActiveInvestments(investorId);
  }

  @ApiOperation({ summary: 'Get all proposals submitted by an investor' })
  @ApiParam({ name: 'investorId', description: 'ID of the investor' })
  @ApiResponse({
    status: 200,
    description: 'List of proposals with startup details and status',
    type: [Object],
  })
  @Get(':investorId/proposals')
  async getInvestorProposals(@Param('investorId') investorId: string): Promise<
    {
      id: unknown;
      startupName: string;
      industry: string;
      investmentAmount: number;
      terms: {
        equity: number;
        conditions: string;
      };
      escrowStatus: {
        amount: number;
        releaseDate: Date;
        status: string;
      };
      status: string;
      createdAt: Date;
    }[]
  > {
    return this.investorDashboardService.getInvestorProposals(investorId);
  }
}
