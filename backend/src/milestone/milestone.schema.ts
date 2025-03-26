import { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface Milestone extends Document {
  milestoneId: string;
  title: string;
  description: string;
  budgetSpent: number;
  completionDate: Date;
  fileUrl: string;
  financialAnalysis: string;
  submittedAt: Date;
  startupId: string;
  status: 'pending' | 'approved' | 'rejected';
  smartContractIds: Types.ObjectId[];
}

export const MilestoneSchema = new Schema<Milestone>({
  milestoneId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budgetSpent: { type: Number, required: true },
  completionDate: { type: Date, required: true },
  fileUrl: { type: String, required: true },
  financialAnalysis: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  startupId: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  smartContractIds: [{ type: Schema.Types.ObjectId, ref: 'SmartContract', default: [] }],
});

export const MilestoneModelName = 'Milestone';