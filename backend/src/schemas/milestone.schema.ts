import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Milestone extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  amountToBeReleased: number; // Amount released when this milestone is achieved

  @Prop({ default: 'pending' })
  status: string; // Status of the milestone

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SmartContract' }] })
  associatedSmartContractId: Types.ObjectId;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
