import dotenv from 'dotenv';
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

// Ensure that the env variables are loaded
dotenv.config({ path: `../../../.env` });

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  migrations: {
    directory: './migrations',
    stub: './migration.stub',
    tableName: 'migrations',
  },
  seeds: {
    directory: './seeds',
    stub: './seed.stub',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
