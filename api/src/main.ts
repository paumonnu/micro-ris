import { CrudConfigService } from '@dataui/crud';
import { crudConfig } from './config/crud.config';
CrudConfigService.load(crudConfig);

import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './shared/filters/http.filter';
import { TypeOrmExceptionFilter } from './shared/filters/typeorm.filter';
import { UnhandledExceptionFilter } from './shared/filters/unhandled.filter';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalFilters(
    new TypeOrmExceptionFilter(),
    new UnhandledExceptionFilter(),
    new HttpExceptionFilter(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get('app.port'));
}
bootstrap();
