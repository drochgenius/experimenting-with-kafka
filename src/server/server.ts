import * as dotenv from 'dotenv';
import { Server, Message, WebSocketClient } from 'ws';
import * as express from 'express';
import { kafkaSubscribe } from './consumer';
dotenv.config();

const PORT: number = parseInt(process.env.PORT) || 3210;

const app = express();

// Server static files
app.use(express.static('./'));

const server = new Server({ server: app.listen(PORT) });

function send(message: Message): void {
    server.clients.forEach(
        (client: WebSocketClient): void => {
            client.send(message.value);
        }
    );
}

server.on(
    'connection',
    (): void => {
        // subscribe to the `test` stream
        kafkaSubscribe(
            'test',
            (message: Message): void => {
                send(message);
            }
        );
    }
);

console.log(`Server listening: http://localhost:${PORT}`);
