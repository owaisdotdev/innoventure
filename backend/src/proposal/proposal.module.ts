import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ProposalsController } from './proposals.controller';
import { ProposalsController } from './proposal.controller';
// import { ProposalsService } from './proposals.service';
import { ProposalsService } from './proposal.service';
import { Proposal, ProposalSchema } from './schemas/proposal.schema';
import { NotificationsModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proposal.name, schema: ProposalSchema }]),
    NotificationsModule,
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export class ProposalsModule {}