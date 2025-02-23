import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['**/api/**/*.entity.js'],
  subscribers: ['**/api/**/*.subscriber.js'],
  synchronize: process.env.DB_SYNC == 'true',
  logging: process.env.DB_LOGGING ? process.env.DB_LOGGING.split(',') : false,
}));
