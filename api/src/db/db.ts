import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '@db/types.js';

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});

export default db;
