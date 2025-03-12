import { Module } from '@nestjs/common';
import { InvestorDashboardService } from './investor-dashboard.service';
import { InvestorDashboardController } from './investor-dashboard.controller';
import { InvestorModule } from '../investor/investor.module';
import { InvestmentModule } from '../investment/investment.module';
import { StartupModule } from '../startup/startup.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Investor, InvestorSchema } from '../schemas/investor.schema';
import { Startup, StartupSchema } from '../schemas/startup.schema';
import { Investment, InvestmentSchema } from '../schemas/investment.schema';
import { Proposal, ProposalSchema } from '../schemas/proposal.schema';
import { ProposalsModule } from '../proposal/proposal.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investor.name, schema: InvestorSchema },
    ]),
    MongooseModule.forFeature([{name: Startup.name, schema: StartupSchema}]),
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
    MongooseModule.forFeature([{ name: Proposal.name, schema: ProposalSchema }]),
    InvestorModule,
    InvestmentModule,
    StartupModule,
    InvestorModule,
    ProposalsModule
  ],
  providers: [InvestorDashboardService],
  controllers: [InvestorDashboardController],
})
export class InvestorDashboardModule {}
