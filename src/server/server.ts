import * as WebSocket from 'ws';
import { Server, Message } from 'ws';
import * as express from 'express';
import { kafkaSubscribe } from './consumer';
const PORT = 3210;

const app = express();
app.use(express.static('./'));

const server = new Server({ server: app.listen(PORT) });

console.log(`Server listening: http://localhost:${PORT}`);

server.on('connection', (socket: WebSocket) => {
    // subscribe to the `test` stream
    kafkaSubscribe('test', (message: Message) => send(message));
});

function send(message: Message): void {
    console.log('Messages are coming')
    server.clients.forEach((client: WebSocket) => {
        client.send(message.value);
    });
}
