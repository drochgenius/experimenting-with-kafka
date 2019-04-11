import { KafkaClient as Client, KeyedMessage, HighLevelProducer } from 'kafka-node';

const topic: string = 'test';

const client = new Client({ kafkaHost: 'kafka.br.internal:9092', requestTimeout: 100000 });
// const client = new Client();
const producer = new HighLevelProducer(client);

producer.on(
    'ready',
    (): void => {
        console.log('Producer is ready');
        const message: string = 'a message';
        const keyedMessage = new KeyedMessage('keyed', 'a keyed message');

        client.refreshMetadata([topic], (err: Error) => {
            console.log(`Sending message to ${topic}`);
            producer.send(
                [{ topic, messages: [message, keyedMessage] }],
                (err: Error, result: any): void => {
                    console.log(err || result);
                }
            );
        });
    }
);

producer.on('error', (err: Error) => {
    console.log('error', err);
});
