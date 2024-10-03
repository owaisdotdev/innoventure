import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from 'src/schemas/investment.schema';
import { Investor, InvestorSchema } from 'src/schemas/investor.schema';
import { Startup, StartupSchema } from 'src/schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
  ],
  providers: [InvestmentService],
  exports: [InvestmentService]
})
export class InvestmentModule {}
