import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './common/filters/http.filter';
import { TypeOrmExceptionFilter } from './common/filters/typeorm.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalInterceptors(new SerializeResourceInterceptor());

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
