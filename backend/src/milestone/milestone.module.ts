import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { MilestoneSchema, MilestoneModelName } from './milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MilestoneModelName, schema: MilestoneSchema }]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService], // Export for use in SmartContractModule
})
export class MilestoneModule {}