import { KafkaClient as Client } from 'kafka-node';

const topic: string = 'test';

// const client = new Client({ kafkaHost: 'kafka.br.internal:9092', requestTimeout: 100000 });
const client = new Client();

client.createTopics([{ topic: 'test', partitions: 0, replicationFactor: 1 }], (err: Error) => {
    if (err) {
        console.log('error', err);
    }
});
