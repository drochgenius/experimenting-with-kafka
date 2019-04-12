import * as program from 'commander';
import { KafkaClient as Client, Producer } from 'kafka-node';

program.version('0.0.1').parse(process.argv);

const topic: string = 'test';

// const client = new Client({ kafkaHost: 'kafka.br.internal:9092', requestTimeout: 100000 });
const client = new Client();
const producer = new Producer(client);

producer.on(
    'ready',
    (): void => {
        console.log('Producer is ready');
        const message: string = program.args.join(' ');
        // const keyedMessage = new KeyedMessage('keyed', 'a keyed message');
        client.refreshMetadata([topic], (err: Error) => {
            console.log(`Sending message to ${topic}: ${message}`);
            producer.send(
                [{ topic, messages: [message] }],
                (err: Error, result: any): void => {
                    console.log(err || result);
                    process.exit();
                }
            );
        });

        producer.on('error', (err: Error) => {
            console.log('error', err);
        });
    }
);
