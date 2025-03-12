import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8000, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'], credentials: true },
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {
    console.log("ChatGateway initialized on port 8000");
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { senderId: string; recipientId: string; content: string; fileUrl?: string; fileType?: string }) {
    console.log("Received sendMessage:", payload);
    const message = await this.chatService.saveMessage(payload);
    console.log("Saved message:", message);
    this.server.to(payload.senderId).emit('newMessage', message);
    this.server.to(payload.recipientId).emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('getChatHistory')
  async handleGetChatHistory(client: Socket, payload: { userId: string; recipientId: string }) {
    const { userId, recipientId } = payload;
    console.log(`Client ${client.id} requested chat history for ${userId} and ${recipientId}`);
    const messages = await this.chatService.getChatHistory(userId, recipientId);
    client.emit('chatHistory', messages);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (!userId) {
      console.error("No userId provided in auth:", client.handshake.auth);
      client.disconnect();
      return;
    }
    client.join(userId);
    console.log(`Client connected: ${userId}, Socket ID: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}