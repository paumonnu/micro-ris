import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './serializer/response.interceptor';
// import { TypeOrmExceptionFilter } from './common/filters/all-exceptions.filter';
// import { ResponseInterceptor } from './serializer/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalInterceptors(new SerializeResourceInterceptor());

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new TypeOrmExceptionFilter());

  await app.listen(3000);
}
bootstrap();
