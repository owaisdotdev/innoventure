import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Investment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Investor', required: true })
  investorId: Types.ObjectId; // Reference to Investor

  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true })
  startupId: Types.ObjectId; // Reference to Startup

  @Prop({ required: true })
  amount: number; // Amount invested

  @Prop({
    type: {
      equity: { type: Number, required: true }, // Percentage of equity
      conditions: { type: String, required: true }, // Investment conditions
    },
    required: true,
  })
  terms: {
    equity: number;
    conditions: string;
  };

  @Prop({
    type: {
      amount: { type: Number, required: true },
      releaseDate: { type: Date, required: true },
      status: { type: String, enum: ['In escrow', 'Released'], required: true },
    },
    required: true,
  })
  escrowStatus: {
    amount: number;
    releaseDate: Date;
    status: string; // E.g., "In escrow", "Released"
  };

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  contractId: Types.ObjectId;

  @Prop({ required: true })
  equityDistribution: number; // Percentage of equity held

  @Prop({ default: Date.now })
  investmentDate: Date; // Investment date
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
