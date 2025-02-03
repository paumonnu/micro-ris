import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import databaseConfig from '../config/database.config';

const options: DataSourceOptions & SeederOptions = {
  ...(databaseConfig() as any),
  ...{
    seeds: ['**/database/**/*.seeder.js'],
    factories: ['**/database/**/*.factory.js'],
    seedTracking: false,
  },
};

export const dataSource = new DataSource(options);
