import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

const app = express();

const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true
    }
});

instrument(ioServer, {
    auth: false
});

const funPublicRooms = () => {
    const {
        sockets: {
            adapter: { sids, rooms }
        }
    } = ioServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
};

const countUsers = (roomName) => {
    return ioServer.sockets.adapter.rooms.get(roomName)?.size;
};

ioServer.on('connection', (socket) => {
    socket['nickname'] = 'Anon';

    socket.onAny((event) => {
        console.log(`Socket Event ${event}`);
    });

    socket.on('enter_room', (roomName) => {
        socket.join(roomName);

        socket.to(roomName).emit('welcome', socket.nickname, countUsers(roomName));
        ioServer.sockets.emit('room_change', funPublicRooms());
    });

    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) =>
            socket.to(room).emit('bye', socket.nickname, countUsers(room) - 1));
    });

    socket.on('disconnect', () => {
        ioServer.sockets.emit('room_change', funPublicRooms());
    });

    socket.on('new_message', (msg, room) => {
        socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    });

    socket.on('nickname', (nickname) => socket['nickname'] = nickname);
});

httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`));