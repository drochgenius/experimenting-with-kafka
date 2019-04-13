import * as dotenv from 'dotenv';
import { KafkaClient as Client, Producer, ProduceRequest } from 'kafka-node';
/**
 * Kafka Producer
 */
dotenv.config();

const kafkaHost: string = process.env.KAFKA_HOST || 'localhost:9092';
const client = new Client({ kafkaHost });
const producer = new Producer(client);

export function publish(topic: string, message: string): void {
    producer.on(
        'ready',
        (): void => {
            console.log('Producer is ready');
            // const keyedMessage = new KeyedMessage('keyed', 'a keyed message');
            client.refreshMetadata(
                [topic],
                (err: Error): void => {
                    if (err) {
                        throw err;
                    }

                    console.log(`Sending message to ${topic}: ${message}`);
                    producer.send(
                        [{ topic, messages: [message] }],
                        (err: Error, result: ProduceRequest): void => {
                            console.log(err || result);
                            process.exit();
                        }
                    );
                }
            );

            producer.on(
                'error',
                (err: Error): void => {
                    console.log('error', err);
                }
            );
        }
    );
}
