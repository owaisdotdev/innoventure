import { Schema, Document } from 'mongoose';

export interface Notification extends Document {
  userId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});