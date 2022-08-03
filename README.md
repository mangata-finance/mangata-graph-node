## Prerequisites

- node 16.x
- docker
- npm -- note that `yarn` package manager is not supported

## Squid Project

Squid is divided into three parts.

- A Postgres-compatible database
- A squid processor that fetches and transforms data before storing it in a database.
- An API server presenting the data

## Running a Squid

1. Build the archive node locally

We currently do not have a public archive, so we must build an archive node locally. (We will soon have a publicly accessible archive node, so this step will be unnecessary.)

Use this command to build an archive node.

```js
docker compose -f archive/docker-compose.yml up
```

2. Install dependencies

```js
npm i
```

3. Build the project (Compile typescript files)

```js
make build
```

4. Start the database

```js
make up
```

5. Start the processor (blocks the terminal):

```js
make process
```

6. Start the API server (blocks the terminal):

```js
make serve
```

The endpoint and the playground are available at the http://localhost:4350/graphql route

## How to add new entities

The **schema.graphql** file defines the target database schema and the TypeORM entity classes. The schema is defined using a GraphQL dialect that has been enhanced with special directives.

Add new entity to schema.graphql file then do mappings in the process.ts file and continue from point 2 with the section Running the Squid.
