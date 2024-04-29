### BOManejo
# bomanejo / api

Implementa um autômato (_daemon_) em Python. Esta aplicação roda como um agente onde, a cada minuto, será executado um script de _bootstrap_ que conecta a um banco de dados (_broker_) em [Redis](https://redis.io) para ler uma lista de tarefas e executá-las.

## Getting started

Copie os arquivos de parametrização:

```
cp .env.ci.example .env.ci
cp .env.example .env
```

> **Atenção!** Se a variável `DEBUG` estiver com o valor '1' o autômato não irá executar periodicamente.

Crie a _network_ do _stack_ de containers:

```
docker network create bomanejo_api_development
```

Por fim, suba os containers:

```
env $(cat .env.ci) docker-compose up --force-recreate --build --wait
```

Para forçar a execução do _script_ do autômato, faça:

```
env $(cat .env.ci) docker-compose exec -it app python /usr/src/app/bootstrap.py
```

Esta aplicação irá conectar em um banco de dados Redis externo, que pode estar em outro _stack_ de containers. Se quiser adicionar o Redis como um serviço em uma aplicação de _backend_, considere a seguinte configuração no `docker-compose.yaml`:

```yaml
services:
    broker:
        image: redis:alpine
        command: redis-server --requirepass ${REDIS_PASSWORD}
        restart: unless-stopped
        volumes:
            - data_broker:/data
        networks:
        - stack
        ports:
            - "${REDIS_PORT}:6379"
        healthcheck:
            test: [ "CMD", "redis-cli", "--raw", "incr", "ping" ]
            interval: 20s
            timeout: 10s
            retries: 5
            start_period: 10s

volumes:
  data_broker:
    name: ${REDIS_DATA}
    external: true
```
