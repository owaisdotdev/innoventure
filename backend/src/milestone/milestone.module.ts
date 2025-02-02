import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import { Milestone, MilestoneSchema } from '../schemas/milestone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StartupModule } from '../startup/startup.module';
import { Startup, StartupSchema } from '../schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Milestone.name, schema: MilestoneSchema }]),
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
    StartupModule, 
  ],
  providers: [MilestoneService],
  controllers: [MilestoneController],
  exports: [MilestoneService]
})
export class MilestoneModule {}
