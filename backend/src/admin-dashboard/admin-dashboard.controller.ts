import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminDashboardService } from './admin-dashboard.service';

@ApiTags('Admin Dashboard')
@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get('total-investments')
  @ApiOperation({ summary: 'Get total investments (amount and count)' })
  @ApiResponse({ status: 200, description: 'Returns total investments' })
  async getTotalInvestments() {
    return await this.adminDashboardService.getTotalInvestments();
  }

  @Get('active-startups')
  @ApiOperation({ summary: 'Get total active startups' })
  @ApiResponse({ status: 200, description: 'Returns total active startups' })
  async getActiveStartups() {
    console.log(await this.adminDashboardService.getActiveStartups());
    return await this.adminDashboardService.getActiveStartups();
  }

  @Get('active-investors')
  @ApiOperation({ summary: 'Get total active investors' })
  @ApiResponse({ status: 200, description: 'Returns total active investors' })
  async getActiveInvestors() {
    return await this.adminDashboardService.getActiveInvestors();
  }

  @Get('recent-activity')
  @ApiOperation({
    summary: 'Get recent activity (investments, startups, investors)',
  })
  @ApiResponse({ status: 200, description: 'Returns recent activity' })
  async getRecentActivity() {
    return await this.adminDashboardService.getRecentActivity();
  }

  @Get('count-investors-startups')
  @ApiOperation({ summary: 'Get counts of active investors and startups' })
  @ApiResponse({
    status: 200,
    description: 'Returns counts of investors and startups',
  })
  async getCountOfInvestorsAndStartups() {
    return await this.adminDashboardService.getCountOfInvestorsAndStartups();
  }

  @Get('recent-investments-with-details')
  @ApiOperation({
    summary:
      'Get recent investments with associated investor and startup details',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns recent investments with investor and startup details',
  })
  async getRecentInvestmentsWithDetails() {
    return await this.adminDashboardService.getRecentInvestmentsWithDetails();
  }

  @Get('fydp-startups')
  @ApiOperation({ summary: 'Get all FYDP startups' })
  @ApiResponse({
    status: 200,
    description: 'Returns all startups that are FYDPs',
  })
  async getFydpStartups() {
    return await this.adminDashboardService.getFydpStartups();
  }

  @Get('investments/pending')
  @ApiOperation({ summary: 'Get all pending investments' })
  @ApiResponse({ status: 200, description: 'Returns all pending investments' })
  async getPendingInvestments() {
    return await this.adminDashboardService.getPendingInvestments();
  }

  @Get('investments/approved')
  @ApiOperation({ summary: 'Get all approved investments' })
  @ApiResponse({ status: 200, description: 'Returns all approved investments' })
  async getApprovedInvestments() {
    return await this.adminDashboardService.getApprovedInvestments();
  }

  @Get('investments/rejected')
  @ApiOperation({ summary: 'Get all rejected investments' })
  @ApiResponse({ status: 200, description: 'Returns all rejected investments' })
  async getRejectedInvestments() {
    return await this.adminDashboardService.getRejectedInvestments();
  }

  @Patch('investments/:id/approve')
  @ApiOperation({ summary: 'Approve a pending investment' })
  @ApiResponse({ status: 200, description: 'Approves the investment' })
  async approveInvestment(@Param('id') investmentId: string) {
    return await this.adminDashboardService.approveInvestment(investmentId);
  }

  @Patch('investments/:id/reject')
  @ApiOperation({ summary: 'Reject a pending investment' })
  @ApiResponse({ status: 200, description: 'Rejects the investment' })
  async rejectInvestment(@Param('id') investmentId: string) {
    return await this.adminDashboardService.rejectInvestment(investmentId);
  }
}
