# Tasks

## Dependencies: 

[Docker](https://www.docker.com/get-started) :)


## Setup

To up the server run

```bash
docker-compose up --build -d
```

in the docker-compose.yml directory.


### Migrations

Run the following command to run startup migrations.

```bash
docker-compose exec api ./node_modules/.bin/adonis migration:run
```

### Play

- [Angular: 0.0.0.0:3000](http://0.0.0.0:3000)
- [API Node: 0.0.0.0:3333](http://0.0.0.0:3333/tasks)

### Stop
Run

```bash
docker-compose stop
```

in the docker-compose.yml directory.