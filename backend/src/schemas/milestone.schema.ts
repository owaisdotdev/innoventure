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
  amountToBeReleased: number; 

  @Prop({ default: 'pending' })
  status: string; 

  @Prop({ type: Types.ObjectId, ref: 'SmartContract', required: true })
  associatedSmartContractId: Types.ObjectId;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
