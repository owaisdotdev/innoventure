import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
// import { NotificationsService } from './notifications.service';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() body: { userId: string; message: string }) {
    console.log(`[Controller] POST /notifications - userId: ${body.userId}, message: ${body.message}`);
    const notification = await this.notificationsService.createNotification(body.userId, body.message);
    console.log("[Controller] Created notification:", notification);
    return notification;
  }

  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    console.log(`[Controller] GET /notifications/${userId} called`);
    const notifications = await this.notificationsService.getNotifications(userId);
    console.log(`[Controller] Returning notifications for ${userId}:`, notifications);
    return notifications;
  }

  @Patch(':userId/mark-read')
  async markAsRead(@Param('userId') userId: string, @Body('message') message: string) {
    return this.notificationsService.markAsRead(userId, message);
  }
}