import { Injectable } from '@nestjs/common';
import { InvestmentService } from '../investment/investment.service';
import { StartupService } from '../startup/startup.service';
import { InvestorService } from '../investor/investor.service';

@Injectable()
export class AdminDashboardService {
  constructor(
    private readonly investmentService: InvestmentService,
    private readonly startupService: StartupService,
    private readonly investorService: InvestorService,
  ) {}

  async getTotalInvestments() {
    const investments = await this.investmentService.findAllInvestments();
    const totalAmount = investments.reduce(
      (sum, investment) => sum + investment.amount,
      0,
    );
    const totalCount = investments.length;
    return { totalAmount, totalCount };
  }

  async getActiveStartups() {
    const activeStartups = (await this.startupService.findAllStartups()).length;
    return { activeStartups };
  }

  async getActiveInvestors() {
    const activeInvestors = (await this.investorService.findAllInvestors())
      .length;
    return { activeInvestors };
  }

  async getRecentActivity() {
    // Fetch recent activity based on your needs (e.g., recent investments, startup launches, etc.)
    const recentInvestments =
      await this.investmentService.getRecentInvestments();
    const recentStartups = await this.startupService.getRecentStartups();
    const recentInvestors = await this.investorService.getRecentInvestors();
    return { recentInvestments, recentStartups, recentInvestors };
  }

  async getCountOfInvestorsAndStartups() {
    const activeInvestors = (await this.investorService.findAllInvestors())
      .length;
    const activeStartups = (await this.startupService.findAllStartups()).length;
    return { activeInvestors, activeStartups };
  }

  async getRecentInvestmentsWithDetails() {
    const recentInvestments =
      await this.investmentService.getRecentInvestmentsWithDetails();
    return recentInvestments;
  }

  async getFydpStartups() {
    return await this.startupService.findFydpStartups();
  }

  async getPendingInvestments() {
    return this.investmentService.findInvestmentsByStatus('pending');
  }

  async getApprovedInvestments() {
    return this.investmentService.findInvestmentsByStatus('approved');
  }

  async getRejectedInvestments() {
    return this.investmentService.findInvestmentsByStatus('rejected');
  }

  async approveInvestment(investmentId: string) {
    return this.investmentService.updateInvestmentStatus(investmentId, 'approved');
  }

  async rejectInvestment(investmentId: string) {
    return this.investmentService.updateInvestmentStatus(investmentId, 'rejected');
  }
}
