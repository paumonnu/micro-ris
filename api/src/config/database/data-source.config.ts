import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';
import { SeederOptions } from 'typeorm-extension';

const dataSourceOptions = {
  ...typeOrmConfig,
  ...{
    seeds: ['**/*.seeder.ts'],
    factories: ['**/*.factory.ts'],
    entities: ['**/resources/**/*.entity.ts'],
    subscribers: ['**/resources/**/*.subscriber.ts'],
  },
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
