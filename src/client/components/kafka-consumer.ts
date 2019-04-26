import { css, CSSResult, LitElement, html, customElement, property, TemplateResult } from 'lit-element';

@customElement('kafka-consumer')
export class KafkaConsumer extends LitElement {
    @property({ type: Array })
    private message: string;

    public static get styles(): CSSResult {
        return css`
            div {
                border: 2px solid black;
                padding: 1em;
                font-size: 1.5em;
                color: blue;
                background-color: lightyellow;
            }
        `;
    }

    public constructor() {
        super();
        this.socketConnect();
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <p>${this.message}</p>
            </div>
        `;
    }

    private socketConnect(): void {
        const ws = new WebSocket('ws://localhost:3210', ['json']);

        ws.addEventListener(
            'open',
            (): void => {
                console.log('websocket connection open');
            }
        );

        // Listen to messages coming from the server over the Web Socket
        ws.addEventListener('message', this.handleMessage.bind(this));
    }

    private handleMessage(event: MessageEvent): void {
        console.log('Received:', event.data);
        this.message = event.data;
    }
}
