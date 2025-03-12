import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface Message {
  _id?: string;
  senderId: string;
  recipientId: string;
  content: string;
  fileUrl?: string;
  fileType?: string;
  createdAt: Date;
}

@Injectable()
export class ChatService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async saveMessage(payload: { senderId: string; recipientId: string; content: string; fileUrl?: string; fileType?: string }): Promise<Message> {
    console.log("Saving message with payload:", payload);
    const message = new this.messageModel({
      ...payload,
      createdAt: new Date(), // Ensure timestamp is set
    });
    return message.save();
  }

  async getChatHistory(userId: string, recipientId: string): Promise<Message[]> {
    console.log(`Fetching chat history between ${userId} and ${recipientId}`);
    return this.messageModel
      .find({
        $or: [
          { senderId: userId, recipientId },
          { senderId: recipientId, recipientId: userId },
        ],
      })
      .sort({ createdAt: 1 }) // Sort by timestamp ascending
      .limit(50) // Limit to recent 50 messages for performance
      .exec();
  }
}