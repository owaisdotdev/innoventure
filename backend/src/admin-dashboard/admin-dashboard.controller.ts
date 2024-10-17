import { Controller, Get } from '@nestjs/common';
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
    console.log(await this.adminDashboardService.getActiveStartups())
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
}
