import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Investor extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
  @Prop({
    type: {
      description: { type: String, required: true },
      industry: { type: String, required: true }
    },
  })
  businessPlan: {
    description: string;
    industry: string;
  };

  @Prop({
    type: {
      sectors: { type: [String] },
      regions: { type: [String] },
      riskTolerance: { type: String },
    },
  })
  preferences: {
    sectors: string[];
    regions: string[];
    riskTolerance: string;
  };

  @Prop({
    type: {
      minInvestment: { type: Number },
      maxInvestment: { type: Number },
      investmentHorizon: { type: String },
    },
  })
  criteria: {
    minInvestment: number;
    maxInvestment: number;
    investmentHorizon: string;
  };

  @Prop({ type: String })
  profileStatus: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Investment' }] })
  investments: Types.ObjectId[];

  @Prop({
    type: [
      {
        type: { type: String },
        message: { type: String },
        date: { type: Date },
      },
    ],
  })
  notifications: {
    type: string;
    message: string;
    date: Date;
  }[];

  @Prop({ type: String })
  resetCode: string;

  @Prop({ type: Date })
  resetCodeExpiration: Date;
}

export const InvestorSchema = SchemaFactory.createForClass(Investor);
