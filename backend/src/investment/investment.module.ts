import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from '../schemas/investment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
  ],
  providers: [InvestmentService],
  exports: [InvestmentService]
})
export class InvestmentModule {}
