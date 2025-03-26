import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { Investment, InvestmentSchema } from '../schemas/investment.schema';
import { SmartContract, SmartContractSchema } from '../schemas/smartContract.schema';
import { Investor, InvestorSchema } from '../schemas/investor.schema';
import { Startup, StartupSchema } from '../schemas/startup.schema';
import { SmartContractModule } from '../smart-contract/smart-contract.module'; // Correct path relative to src/investment/
import { InvestorModule } from '../investor/investor.module';
import { StartupModule } from '../startup/startup.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
      { name: SmartContract.name, schema: SmartContractSchema },
      { name: Investor.name, schema: InvestorSchema },
      { name: Startup.name, schema: StartupSchema },
    ]),
    SmartContractModule,
    InvestorModule,
    StartupModule,
  ],
  providers: [InvestmentService],
  exports: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}