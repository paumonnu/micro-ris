import { DataSource, DataSourceOptions } from 'typeorm';
import InitSeeder from '../seeders/init.seeder';
import { typeOrmConfig } from './typeorm.config';
import { SeederOptions } from 'typeorm-extension';

const dataSourceOptions = {
  ...typeOrmConfig,
  ...{
    seeds: [InitSeeder],
  },
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
