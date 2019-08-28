# Nestjs blog server

## First run
1. [Install dependencies](#Installation)
2. [Configurate application](#Configurations)
3. [Run migraions](#Migrations)
4. [Run application](#Running the app)

## Used

[NestJS](https://nestjs.com/)
[TypeORM](https://typeorm.io)
[Convict](https://www.npmjs.com/package/convict)
[Passport](http://www.passportjs.org)

## Installation

```bash
$ npm install
```

## Configurations

1. Rename config example:
```bash
$ mv config.json.example config.json
```
2. Change the configuration to meet the requirements. See all config settings in `src/config/schema.ts`

## Migrations

```bash
# create migration with name "myName"
$ npm run migration:create -- -n myName

# run migraions
$ npm run migration:run

# revert migraions
$ npm run migration:revert

# run migration-command (e.g. migration:generate)
# see https://typeorm.io/#/using-cli
$ npm run migration -- <migration-command> <args>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# inspect mode
$ npm run start:debug
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
