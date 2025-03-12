import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop()
  content: string;

  @Prop()
  fileUrl: string;

  @Prop()
  fileType: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);