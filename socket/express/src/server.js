import http from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on('connection', (socket) => {
    sockets.push(socket);

    console.log('Connected To Browser');

    socket.on('close', () => console.log('Disconnected from the Browser'));

    socket.on('message', (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString('utf8')));

        console.log(message.toString('utf8'));
    });
});

server.listen(3000, () => console.log(`Listening on http://localhost:3000`));