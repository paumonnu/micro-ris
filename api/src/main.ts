import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './common/filters/http.filter';
import { TypeOrmExceptionFilter } from './common/filters/typeorm.filter';
import { UnhandledExceptionFilter } from './common/filters/unhandled.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalFilters(
    new UnhandledExceptionFilter(),
    new TypeOrmExceptionFilter(),
    new HttpExceptionFilter(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get('app.port'));
}
bootstrap();
