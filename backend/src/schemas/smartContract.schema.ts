import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class SmartContract extends Document {
  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'Investment' })
  investmentId?: Types.ObjectId;

  @Prop({
    type: {
      milestoneConditions: { type: String, required: true },
      escrowAmount: { type: Number, required: true },
    },
    required: true,
  })
  terms: {
    milestoneConditions: string;
    escrowAmount: number;
  };

  @Prop({
    type: {
      milestoneId: { type: Types.ObjectId, ref: 'Milestone', required: true },
      status: { type: String, enum: ['Achieved', 'Pending'], required: true },
    },
    required: true,
  })
  milestoneStatus: {
    milestoneId: Types.ObjectId;
    status: string;
  };

  @Prop({ required: true })
  escrowAmount: number; // Amount in escrow

  @Prop({ type: String, enum: ['Active', 'Completed'], required: true })
  status: string; // E.g., "Active", "Completed"
}

export const SmartContractSchema = SchemaFactory.createForClass(SmartContract);
