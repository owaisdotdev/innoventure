import { Module } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Investor, InvestorSchema,  } from '../schemas/investor.schema';
import { InvestorController } from './investor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Investor.name, schema: InvestorSchema }]),
  ],
  providers: [InvestorService],
  exports: [InvestorService],
  controllers: [InvestorController],
})
export class InvestorModule {}
