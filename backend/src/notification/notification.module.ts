import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';
import { NotificationSchema } from './notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}