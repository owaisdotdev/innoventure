import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Notification } from './schemas/notification.schema';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationsService {
  create(arg0: { userId: string; message: string; type: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('Notification') private notificationModel: Model<Notification>) {}

  async createNotification(userId: string, message: string) {
    const notification = new this.notificationModel({
      userId,
      message,
      read: false,
      timestamp: new Date(),
    });
    return notification.save();
  }

  async getNotifications(userId: string) {
    console.log(`[Service] Fetching notifications for ${userId}`);
    const notifications = await this.notificationModel.find({ userId }).exec();
    console.log(`[Service] Found notifications:`, notifications);
    return notifications;
  }

  async markAsRead(userId: string, message: string) {
    return this.notificationModel.updateOne({ userId, message, read: false }, { read: true });
  }
}