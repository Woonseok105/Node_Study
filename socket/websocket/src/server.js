import http from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on('connection', (socket) => {
    sockets.push(socket);
    socket['nickname'] = 'Anon';

    console.log('Connected To Browser');

    socket.on('close', () => console.log('Disconnected from the Browser'));

    socket.on('message', (msg) => {
        const message = JSON.parse(msg);
        console.log(socket)

        switch (message.type) {
            case 'new_message':
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`));
                break;

            case 'nickname':
                socket['nickname'] = message.payload;
                console.log(socket.nickname);
                break;
        }
        console.log(msg.toString('utf8'));
    });
});

server.listen(3000, () => console.log(`Listening on http://localhost:3000`));