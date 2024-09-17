import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { TypeOrmExceptionFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SerializeResourceInterceptor } from './common/interceptors/serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new SerializeResourceInterceptor());

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new TypeOrmExceptionFilter());

  await app.listen(3000);
}
bootstrap();
