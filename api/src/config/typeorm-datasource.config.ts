import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import databaseConfig from './database.config';
import PermissionSeeder from '../database/seeders/permission.seeder';
import RoleSeeder from '../database/seeders/role.seeder';
import UserSeeder from '../database/seeders/user.seeder';

const dataSourceOptions = {
  ...databaseConfig(),
  ...{
    seeds: [PermissionSeeder, RoleSeeder, UserSeeder],
    factories: ['**/*.factory.ts'],
    entities: ['**/api/**/*.entity.ts'],
    subscribers: ['**/api/**/*.subscriber.ts'],
  },
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
