import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Investor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: {
      sectors: { type: [String], required: true },
      regions: { type: [String], required: true },
      riskTolerance: { type: String, required: true },
    },
  })
  preferences: {
    sectors: string[];
    regions: string[];
    riskTolerance: string;
  };

  @Prop({
    type: {
      minInvestment: { type: Number, required: true },
      maxInvestment: { type: Number, required: true },
      investmentHorizon: { type: String, required: true },
    },
  })
  criteria: {
    minInvestment: number;
    maxInvestment: number;
    investmentHorizon: string;
  };

  @Prop({ type: String, required: true })
  profileStatus: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Investment' }] })
  investments: Types.ObjectId[]; // List of investments

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
  })
  notifications: {
    type: string;
    message: string;
    date: Date;
  }[];
}

export const InvestorSchema = SchemaFactory.createForClass(Investor);
