# Experimenting with Apache Kafka

Experimenting with [Apache Kafka](https://kafka.apache.org/intro) using [kafka-node](https://github.com/SOHU-Co/kafka-node).

Apache Kafka is a distributed streaming platform.

Here are some of the typical Kafka use cases:

* Connect systems together
* Build data pipelines

For a brief introduction to Kafka, we recommend reading this [article](https://sookocheff.com/post/kafka/kafka-in-a-nutshell/) in addition to the official Kafka docs.


## Overview

The most popular data format used with Kafka is [avro](https://avro.apache.org/), but Kafka supports any type of data. For the sake of simplicity, we'll use plain text messages in this demo.

![kafka demo](/img/kafka-demo.png)

* A simple command-line tool to publish messages to a Kafka stream.
* A basic Express server that subscribes to a Kafka stream and exposes it over a WebSocket.
* A simple front-end application to display incoming messages.


## Local Kafka Setup

Assuming you have installed [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) on your computer.

```shell
# Start the Kafka & Zookeeper
docker-compose up -d
# Stop the Kafka & Zookeeper
docker-compose down
```

Kafka is running on port `localhost:9092`. Don't try to navigate to the Kafka url with your browser, since Kafka does not use HTTP.

## Prepare

```shell
# install dependencies
npm install
# link the command-line interface
npm link
```

## Build

This project is written in TypeScript. Client-side is bundled with Rollup.
Therefore, you must build the source code:

```shell
# build and bundle client with rollup
npm run build && npm run bundle
# watch files for development
npm run watch
```

## Send messages using the CLI

Make sure you executed `npm link` orthe following may not work.

```shell
# cli man page
kafka-publish -h
# send message on the test topic
kafka-publish -t test "Foo bar"
```








