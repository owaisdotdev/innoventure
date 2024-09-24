import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DAO extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  proposalId: Types.ObjectId; // Reference to Proposal

  @Prop({ required: true })
  proposalDescription: string; // Description of the proposal

  @Prop({
    type: [
      {
        investorId: { type: Types.ObjectId, ref: 'Investor', required: true }, // Reference to Investor
        vote: { type: String, enum: ['For', 'Against'], required: true }, // E.g., "For", "Against"
      },
    ],
    required: true,
  })
  votes: {
    investorId: Types.ObjectId;
    vote: string; // "For" or "Against"
  }[];

  @Prop({ type: String, enum: ['Approved', 'Rejected'], required: true })
  outcome: string; // E.g., "Approved", "Rejected"

  @Prop({ default: Date.now })
  date: Date; // Date of the proposal
}

export const DAOSchema = SchemaFactory.createForClass(DAO);
