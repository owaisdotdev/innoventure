import { SmartContractModule } from './../smart-contract/smart-contract.module';
import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from '../schemas/investment.schema';
import { InvestmentController } from './investment.controller';
import { SmartContract, SmartContractSchema } from '../schemas/smartContract.schema';
import { Investor, InvestorSchema } from '../schemas/investor.schema';
import { InvestorModule } from '../investor/investor.module';
import { StartupModule } from '../startup/startup.module';
import { Startup, StartupSchema } from '../schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
    MongooseModule.forFeature([{name: SmartContract.name, schema: SmartContractSchema}]),
    MongooseModule.forFeature([{name: Investor.name, schema: InvestorSchema}]),
    MongooseModule.forFeature([{name: Startup.name, schema: StartupSchema}]),
    SmartContractModule,
    InvestorModule,
    StartupModule
  ],
  providers: [InvestmentService],
  exports: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}
