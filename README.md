# Experimenting with Apache Kafka
Experimenting with Apache Kafka using kafka-node

## Local Kafka Stack Setup

Assuming you have installed [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) on your computer.

```shell
# Start the Kafka stack
docker-compose up -d
# Stop the Kafka stack
docker-compose down
```

Kafka is running on port `9092`.
Schema registry is running on port `8081`.

The following UI are available:

* [Kafka Topics UI](http://localhost:8000)
* [Schema Registry UI](http://localhost:8001)
* [Kafka Connect UI](http://localhost:8003)
* [ZooNavigator](http://localhost:8004)




