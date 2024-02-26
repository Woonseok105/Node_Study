import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();

const httpServer = http.createServer(app);
const ioServer = new Server(httpServer);

ioServer.on('connection', (socket) => {
    socket['nickname'] = 'Anon';

    socket.onAny((event) => {
        console.log(`Socket Event ${event}`);
    });

    socket.on('enter_room', (roomName) => {
        socket.join(roomName);

        socket.to(roomName).emit('welcome', socket.nickname);
    });

    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => socket.to(room).emit('bye', socket.nickname));
    });

    socket.on('new_message', (msg, room) => {
        socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    });

    socket.on('nickname', (nickname) => socket['nickname'] = nickname);
});

httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`));