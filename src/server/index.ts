import * as crypto from 'crypto';
import * as http from 'http';
import { IncomingMessage, ServerResponse, Server } from 'http';
import { Server as StaticServer } from 'node-static';

function generateAcceptValue(key: string): string {
    return crypto
        .createHash('sha1')
        .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
        .digest('base64');
}

const PORT: number = parseInt(process.env.PORT) || 3210;

const file = new StaticServer('./');

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    req.addListener('end', () => file.serve(req, res)).resume();
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

server.on('upgrade', (req: IncomingMessage, socket: ServerResponse) => {
    // Make sure that we only handle WebSocket upgrade requests
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }

    // Read the websocket key provided by the client:
    const acceptKey: string = req.headers['sec-websocket-key'] as string;
    console.log('acceptKey', acceptKey);
    // Generate the response value to use in the response:
    const hash: string = generateAcceptValue(acceptKey);
    // Write the HTTP response into an array of response lines:
    const responseHeaders: string[] = [
        'HTTP/1.1 101 Web Socket Protocol Handshake',
        'Upgrade: WebSocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${hash}`
    ];
    // Read the subprotocol from the client request headers:
    const protocol: string = req.headers['sec-websocket-protocol'] as string;
    // If provided, they'll be formatted as a comma-delimited string of protocol
    // names that the client supports; we'll need to parse the header value, if
    // provided, and see what options the client is offering:
    const protocols: string[] = !protocol ? [] : protocol.split(',').map((s: string) => s.trim());
    // To keep it simple, we'll just see if JSON was an option, and if so, include
    // it in the HTTP response:
    if (protocols.includes('json')) {
        // Tell the client that we agree to communicate with JSON data
        responseHeaders.push(`Sec-WebSocket-Protocol: json`);
    }
    // Write the response back to the client socket, being sure to append two
    // additional newlines so that the browser recognises the end of the response
    // header and doesn't continue to wait for more header data:
    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
});
