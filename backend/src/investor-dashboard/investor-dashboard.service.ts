import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Investor } from '../schemas/investor.schema';
import { Startup } from '../schemas/startup.schema';
import { Investment } from '../schemas/investment.schema';

@Injectable()
export class InvestorDashboardService {
  constructor(
    @InjectModel(Investor.name) private investorModel: Model<Investor>,
    @InjectModel(Startup.name) private startupModel: Model<Startup>,
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
  ) {}

  /**
   * Get the total investment amount made by an investor
   * @param investorId - ID of the investor
   * @returns Total investment amount
   */
  async getTotalInvestment(investorId: string): Promise<number> {
    const investments = await this.investmentModel
      .find({ investor: investorId })
      .exec();

    if (investments.length > 0) {
      const totalInvestment = investments.reduce(
        (sum, investment) => sum + investment.amount,
        0,
      );
      return totalInvestment;
    } else {
      return 0;
    }
  }

  /**
   * Get active startups the investor has invested in
   * @param investorId - ID of the investor
   * @returns Number of active startups
   */
  async getActiveStartups(investorId: string): Promise<number> {
    const investments = await this.investmentModel
      .find({ investor: investorId })
      .select('startup')
      .exec();

    return investments.length;
  }

  /**
   * Get the total returns for an investor
   * @param investorId - ID of the investor
   * @returns Total returns calculated from equityDistribution
   */
  async getTotalReturns(investorId: string): Promise<number> {
    const investments = await this.investmentModel
      .find({ investorId: investorId, status: 'approved' })
      .exec();

    // If equityDistribution contributes to returns, adjust formula accordingly
    const totalReturns = investments.reduce((sum, investment) => {
      const equityValue = investment.equityDistribution * investment.amount; // Hypothetical calculation
      return sum + equityValue;
    }, 0);

    return totalReturns;
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
  ): Promise<{ type: string; message: string; date: Date }[]> {
    const investor = await this.investorModel
      .findById(investorId)
      .select('notifications')
      .exec();

    if (!investor) {
      throw new Error('Investor not found');
    }

    const recentActivity = investor.notifications
      .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date, descending
      .slice(0, limit);

    return recentActivity;
  }

  /**
   * Get active investments of an investor
   * @param investorId - ID of the investor
   * @returns List of active investments with startup name, investment amount, and status
   */
  async getActiveInvestments(investorId: string): Promise<
    {
      startupName: string;
      amount: number;
      status: string;
    }[]
  > {
    // Fetch active investments for the investor
    const investments = await this.investmentModel
      .find({ investor: investorId }) // Active investments
      .populate('startupId', 'name') // Populate startup name
      .exec();

    // Map the results to include only required fields
    const activeInvestments = investments.map((investment) => ({
      startupName: investment.startupId['name'], // Access populated startup name
      amount: investment.amount,
      status: investment.status,
    }));

    return activeInvestments;
  }
}
