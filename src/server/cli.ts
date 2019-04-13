#!/usr/bin/env node
/**
 * CLI tool to publish messages to Kafka topics
 */
import * as program from 'commander';
import { publish } from './producer';

program
    .version('0.0.1')
    .usage('[options] <message>')
    .option('-t, --topic [topic]', 'Kafka topic', 'test')
    .parse(process.argv);

const message: string = program.args.join(' ');
console.log('TOPIC:', program.topic);
console.log('MESSAGE:', message);
publish(program.topic, message);
