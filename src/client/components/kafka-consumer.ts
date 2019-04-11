import { LitElement, html, customElement, property, TemplateResult } from 'lit-element';

@customElement('kafka-consumer')
export class KafkaConsumer extends LitElement {
    @property({ type: Array })
    private messages: string[];

    private ws: WebSocket;

    constructor() {
        super();
        this.setupWebSocket();
    }

    protected render(): TemplateResult {
        return html`
            <p>Coming soon...</p>
        `;
    }

    private setupWebSocket() {
        const ws = new WebSocket('ws://localhost:3210', ['json']);
        ws.addEventListener(
            'open',
            (): void => {
                const message = 'Hello!';
                console.log('Sending:', message);
                // Send the message to the WebSocket server
                ws.send(message);
            }
        );

        // Add a listener in order to process WebSocket messages received from the server
        ws.addEventListener(
            'message',
            (event: MessageEvent): void => {
                // The `event` object is a typical DOM event object, and the message data sent
                // by the server is stored in the `data` property
                console.log('Received:', event.data);
            }
        );

        this.ws = ws;
    }
}
