import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  baseUrl:
    process.env.PROTOCOL +
    '://' +
    process.env.HOST +
    ':' +
    parseInt(process.env.PORT),
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
}));
