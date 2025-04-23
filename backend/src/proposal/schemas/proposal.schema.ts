import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Investor  } from '../../schemas/investor.schema';
import { Startup } from '../../schemas/startup.schema';

@Schema({ timestamps: true })
export class Proposal extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true })
  startupId: string;

  @Prop({ type: Types.ObjectId, ref: 'Investor', required: true })
  investorId: string;

  @Prop({ enum: ['startup', 'investor'], required: true })
  sentBy: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  investmentAmount: number;

  @Prop()
  equityOffer: number;

  @Prop()
  equityInterest: number;

  @Prop()
  fundingRequired: number;

  @Prop()
  useOfFunds: string;

  @Prop()
  milestones: string;

  @Prop()
  deliverables: string;

  @Prop()
  valueAddition: string;

  @Prop()
  relevantExperience: string;

  @Prop()
  attachment: string;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;

  @Prop()
  startupName: string;

  @Prop()
  industry: string;

  @Prop()
  startupEmail: string;

  @Prop()
  pitchDeck: string;

  @Prop()
  description: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
