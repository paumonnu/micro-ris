import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { TypeOrmExceptionFilter } from './core/filters/typeorm.filter';
// import { HttpExceptionFilter } from './core/filters/http.filter';
import { useContainer } from 'class-validator';
// import { ResponseInterceptor } from './serializer/response.interceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalInterceptors(new SerializeResourceInterceptor());

  // app.useGlobalFilters(new TypeOrmExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get('app.port'));
};

bootstrap();
