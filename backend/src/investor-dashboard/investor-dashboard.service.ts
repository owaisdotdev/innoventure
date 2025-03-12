import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Investor } from '../schemas/investor.schema';
import { Startup } from '../schemas/startup.schema';
import { Investment } from '../schemas/investment.schema';
import { Proposal } from '../schemas/proposal.schema';

@Injectable()
export class InvestorDashboardService {
  constructor(
    @InjectModel(Investor.name) private investorModel: Model<Investor>,
    @InjectModel(Startup.name) private startupModel: Model<Startup>,
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
    @InjectModel(Proposal.name) private proposalModel: Model<Proposal>,
  ) {}

  /**
   * Get the total investment amount made by an investor
   * @param investorId - ID of the investor
   * @returns Total investment amount
   */
  async getTotalInvestment(investorId: string): Promise<{ total: number }> {
    const investments = await this.investmentModel
      .find({ investorId: new Types.ObjectId(investorId) })
      .exec();

    const totalInvestment = investments.reduce((sum, investment) => sum + (investment.amount || 0), 0);
    return { total: totalInvestment };
  }

  /**
   * Get the number of active startups the investor has invested in
   * @param investorId - ID of the investor
   * @returns Number of active startups
   */
  async getActiveStartups(investorId: string): Promise<{ count: number }> {
    const investments = await this.investmentModel
      .find({ investorId: new Types.ObjectId(investorId) })
      .select('startupId')
      .exec();

    return { count: investments.length };
  }

  /**
   * Get the total returns for an investor
   * @param investorId - ID of the investor
   * @returns Total returns calculated from equityDistribution
   */
  async getTotalReturns(investorId: string): Promise<{ total: string }> {
    const investments = await this.investmentModel
      .find({ investorId: new Types.ObjectId(investorId), status: 'approved' })
      .exec();

    const totalReturns = investments.reduce((sum, investment) => {
      const equityValue = (investment.equityDistribution || 0) * (investment.amount || 0);
      return sum + equityValue;
    }, 0);

    return { total: `$${totalReturns.toFixed(2)}` };
  }

  /**
   * Get recent activity of an investor
   * @param investorId - ID of the investor
   * @param limit - Number of recent activities to fetch (default: 10)
   * @returns List of recent notifications for the investor
   */
  async getRecentActivity(
    investorId: string,
    limit = 10,
  ): Promise<{ activities: { type: string; message: string; date: Date }[] }> {
    try {
      const investor = await this.investorModel
        .findById(investorId)
        .select('notifications')
        .exec();

      if (!investor || !investor.notifications) {
        console.log(`[Service] No investor or notifications found for investorId: ${investorId}`);
        return { activities: [] };
      }

      const recentActivity = investor.notifications
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, limit);

      return { activities: recentActivity };
    } catch (error) {
      console.error(`[Service] Error fetching recent activity for ${investorId}:`, error.message);
      return { activities: [] };
    }
  }

  /**
   * Get active investments of an investor
   * @param investorId - ID of the investor
   * @returns List of active investments with startup name, investment amount, and status
   */
  async getActiveInvestments(investorId: string): Promise<
    { startupName: string; amount: number; status: string }[]
  > {
    const investments = await this.investmentModel
      .find({ investorId: new Types.ObjectId(investorId) })
      .populate('startupId', 'name')
      .exec();

    return investments.map((investment) => ({
      startupName: investment.startupId && 'name' in investment.startupId ? investment.startupId['name'] as string : 'Unknown',
      amount: investment.amount || 0,
      status: investment.status || 'Unknown',
    }));
  }

  /**
   * Get all proposals submitted by an investor
   * @param investorId - ID of the investor
   * @returns List of proposals with startup details and status
   */
  async getInvestorProposals(investorId: string): Promise<
    {
      id: string;
      startupName: string;
      industry: string;
      investmentAmount: number;
      terms: { equity: number; conditions: string };
      escrowStatus: string | { amount: number; releaseDate: Date; status: string }; // Updated type
      status: string;
      createdAt: Date;
    }[]
  > {
    const proposals = await this.proposalModel
      .find({ investorId: new Types.ObjectId(investorId) })
      .populate('startupId', 'name')
      .sort({ _id: -1 })
      .exec();

    return proposals.map((proposal) => ({
      id: proposal._id.toString(),
      startupName: proposal.startupId && 'name' in proposal.startupId ? (proposal.startupId as any).name : 'Unknown',
      industry: proposal.industry || 'N/A',
      investmentAmount: proposal.investmentAmount || 0,
      terms: {
        equity: proposal.terms?.equity || 0,
        conditions: proposal.terms?.conditions || 'N/A',
      },
      escrowStatus: proposal.escrowStatus || 'N/A', // Keep as-is, TypeScript will handle union type
      status: proposal.status || 'Pending',
      createdAt: (proposal._id as Types.ObjectId).getTimestamp(),
    }));
  }
}