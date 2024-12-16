import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Propsoal extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Investor' })
  investorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Startup' })
  startupId: Types.ObjectId;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  investmentAmount: number;

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
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status: string;
}

export const PropsoalSchema = SchemaFactory.createForClass(Propsoal);
