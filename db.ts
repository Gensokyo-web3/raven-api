import { PostgresConnector } from './deps.ts';

import {
  RAVEN_POSTGRES_DB_HOST,
  RAVEN_POSTGRES_DB_PORT,
  RAVEN_POSTGRES_DB_USER,
  RAVEN_POSTGRES_DB_PASSWORD,
  RAVEN_POSTGRES_DB_NAME,
} from './env.ts';

export const DBConnection = new PostgresConnector({
  host: RAVEN_POSTGRES_DB_HOST,
  port: RAVEN_POSTGRES_DB_PORT,
  username: RAVEN_POSTGRES_DB_USER,
  password: RAVEN_POSTGRES_DB_PASSWORD,
  database: RAVEN_POSTGRES_DB_NAME,
});

