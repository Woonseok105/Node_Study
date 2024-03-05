import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Server, Socket} from 'socket.io';

@WebSocketGateway(4000)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server


    @SubscribeMessage('nickname')
    handleNickname(@MessageBody() nickname: string, @ConnectedSocket() client: Socket) {
        client.data['nickname'] = nickname
    }

    @SubscribeMessage('enter_room')
    handleJoinRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
        client.join(roomName)
        client.to(roomName).emit('welcome', client.data.nickname)
    }

    @SubscribeMessage('new_message')
    handleMessage(@MessageBody() [msg, roomName ], @ConnectedSocket() client: Socket) {
        client.to(roomName).emit('new_message', `${client.data.nickname}: ${msg}`)
    }

    handleConnection(client: Socket, ...args): any {
        console.log(`client Connection ${client.id}`)
    }

    handleDisconnect(client: Socket): any {
        console.log(`Client disconnected: ${client.id}`);
    }
}
