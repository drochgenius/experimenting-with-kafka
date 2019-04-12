import * as dotenv from 'dotenv';
import { KafkaClient as Client, Producer } from 'kafka-node';

dotenv.config();

const kafkaHost: string = process.env.KAFKA_HOST || 'localhost:9092';
const client = new Client({ kafkaHost });
const producer = new Producer(client);

export function publish(topic: string, message: string) {
    producer.on(
        'ready',
        (): void => {
            console.log('Producer is ready');
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
}
