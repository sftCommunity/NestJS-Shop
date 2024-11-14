import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Socket;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
    console.log(
      'Connected clients:',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
    console.log(
      'Connected clients:',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // This way emit the message just to the sender
    // this.wss.emit('message-from-server', {
    //   fullName: this.messagesWsService.getUserFullName(client.id),
    //   message: payload.message,
    // });

    // This way emit the message to all connected clients except the sender
    // client.broadcast.emit('message-from-server', {
    //   fullName: this.messagesWsService.getUserFullName(client.id),
    //   message: payload.message,
    // });

    // This way emit the message to all connected clients including the sender
    this.wss.emit('message-from-server', {
      fullName: 'Me',
      message: payload.message,
    });
  }
}