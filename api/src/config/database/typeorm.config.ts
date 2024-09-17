import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../modules/resources/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 8881,
  username: 'notifyappdbusr',
  password: '6mahoney9!',
  database: 'notifyappdb',
  // entities: [User],
  entities: ['**/resources/**/*.entity.js'],
  subscribers: ['**/resources/**/*.subscriber.js'],
  synchronize: true,
  // dropSchema: true,
};
