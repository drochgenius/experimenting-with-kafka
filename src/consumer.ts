import { KafkaClient as Client, Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

const topic: string = 'test';

const client = new Client();
const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
const options: ConsumerOptions = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new Consumer(client, topics, options);

consumer.on('error', function(err: Error) {
    console.log('error', err);
});

client.refreshMetadata([topic], (err: Error) => {
    const offset = new Offset(client);

    if (err) {
        console.error('HERRRRRRRRRROR', err);
        process.exit(1);
    }

    consumer.on('message', function(message: Message) {
        console.log(message);
    });

    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
    consumer.on('offsetOutOfRange', (topic: OffsetFetchRequest) => {
        // @ts-ignore
        topic.maxNum = 2;
        offset.fetch([topic], function(err, offsets) {
            if (err) {
                return console.error(err);
            }
            const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
            consumer.setOffset(topic.topic, topic.partition, min);
        });
    });
});
