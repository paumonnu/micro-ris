import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import databaseConfig from './database.config';

const dataSourceOptions = {
  ...databaseConfig(),
  ...{
    seeds: ['**/*.seeder.ts'],
    factories: ['**/*.factory.ts'],
    entities: ['**/api/**/*.entity.ts'],
    subscribers: ['**/api/**/*.subscriber.ts'],
  },
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
