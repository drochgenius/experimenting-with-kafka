#!/usr/bin/env node
import * as program from 'commander';
import { publish } from './producer';

program
    .version('0.0.1')
    .option('-t, --topic [topic]', 'Kafka topic', 'test')
    .parse(process.argv);

console.log('TOPIC', program.topic);
console.log('message', program.args);

publish(program.topic, program.args.join(' '));
