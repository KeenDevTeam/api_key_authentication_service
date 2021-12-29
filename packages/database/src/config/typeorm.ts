/**
 * This file is used for migration/CLI apps.
 * Not for the API or any other purpose.
 */

import { resolve as resolvePath, join as joinPath } from 'path';

import { ConnectionOptions } from 'typeorm';
import { get as env } from 'env-var';

/* FIXED RELATIVE PATHS */
const ROOT_DIR = resolvePath(joinPath(__dirname, '..'));
const ENTITIES_DIR = joinPath(ROOT_DIR, 'models');
const MIGRATIONS_DIR = joinPath(ROOT_DIR, 'migrations');

const ACCEPTED_EXTENSIONS = '{.ts,.js}';

export const SCHEMA_NAME = 'api_key_auth';

/* Default TypeOrm connection options */
const defaultTypeOrmConnectionOptions: ConnectionOptions = {
  /* General */
  type: 'postgres',
  applicationName: 'keendev_api_key_auth',

  /* Connection options */
  url: env('KD_API_KEY_AUTH_DB_URL').required().asUrlString(),
  connectTimeoutMS: 15 * 1000,
  schema: SCHEMA_NAME, // override schema name

  /* List of entities/migrations */
  entities: [joinPath(ENTITIES_DIR, '**', `*.entity${ACCEPTED_EXTENSIONS}`)],
  migrations: [joinPath(MIGRATIONS_DIR, '**', `*${ACCEPTED_EXTENSIONS}`)],

  /* Disable auto migration */
  migrationsRun: false,
  synchronize: false,

  /* Caching */
  cache: false,

  /* logging */
  logging: true, // logs everything
  logger: 'advanced-console',

  /* CLI */
  cli: {
    entitiesDir: ENTITIES_DIR,
    migrationsDir: MIGRATIONS_DIR,
  },
};

/* Connection options */
let connectionOptions: ConnectionOptions = {
  ...defaultTypeOrmConnectionOptions,
};

/* Export configuration */
export const ormconfig = { ...connectionOptions };
export default ormconfig;
