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

  @Prop({ required: true })
  investmentAmount: number;

  @Prop({ required: true })
  equityOffer: number;

  @Prop({ required: true })
  deliverables: string;

  @Prop({ required: true })
  milestones: string;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);