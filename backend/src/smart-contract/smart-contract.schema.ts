import { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface SmartContract extends Document {
  milestoneStatus: {
    milestoneId: Types.ObjectId;
    status: string;
  };
  investmentId?: Types.ObjectId;
  status?: string;
}

export const SmartContractSchema = new Schema<SmartContract>({
  milestoneStatus: {
    milestoneId: { type: Schema.Types.ObjectId, ref: 'Milestone', required: true },
    status: { type: String, required: true },
  },
  investmentId: { type: Schema.Types.ObjectId, ref: 'Investment' },
  status: { type: String, enum: ['Active', 'Completed'] },
});

export const SmartContractModelName = 'SmartContract';