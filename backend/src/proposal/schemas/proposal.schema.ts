import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Proposal extends Document {
  @Prop({ required: true })
  startupId: string;

  @Prop({ required: true })
  investorId: string;

  @Prop({ required: true })
  startupName: string;

  @Prop({ required: true })
  industry: string;

  investmentAmount: number;

  equityOffer: number;

  deliverables: string;

  milestones: string;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ enum: ['startup', 'investor'], default: 'investor' })
  sentBy: string;

  startupEmail: string;

  fundingRequired: string;

  pitchDeck: string;

  description: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);