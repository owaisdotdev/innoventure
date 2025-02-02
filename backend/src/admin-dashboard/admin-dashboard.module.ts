import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { InvestmentModule } from '../investment/investment.module'; 
import { StartupModule } from '../startup/startup.module';
import { InvestorModule } from '../investor/investor.module';

@Module({
  imports: [InvestmentModule, StartupModule, InvestorModule], // Import the necessary modules
  providers: [AdminDashboardService],
  controllers: [AdminDashboardController],
})
export class AdminDashboardModule {}
