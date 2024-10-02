import { Module } from '@nestjs/common';
import { SmartContractService } from './smart-contract.service';
import { SmartContractController } from './smart-contract.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SmartContract,
  SmartContractSchema,
} from '../schemas/smartContract.schema';
import { Milestone, MilestoneSchema } from '../schemas/milestone.schema';
import { MilestoneModule } from '../milestone/milestone.module';
import { Investment, InvestmentSchema } from '../schemas/investment.schema';
import { Startup, StartupSchema } from '../schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SmartContract.name, schema: SmartContractSchema },
    ]),
    MongooseModule.forFeature([
      { name: Milestone.name, schema: MilestoneSchema },
    ]),
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: Startup.name, schema: StartupSchema },
    ]),
    MilestoneModule,
  ],
  providers: [SmartContractService],
  controllers: [SmartContractController],
  exports: [SmartContractService]
})
export class SmartContractModule {}
