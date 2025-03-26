import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
// import { MessageSchema } from './schemas/message.schema';
// import { MessageSchema } from './message.schema';
import { MessageSchema } from './chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}