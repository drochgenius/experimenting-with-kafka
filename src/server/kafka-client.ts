import { KafkaClient as Client } from 'kafka-node';

const kafkaHost = 'localhost:9092';
const client = new Client({ kafkaHost });
