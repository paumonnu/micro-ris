import {
  Module,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { SerializerModule } from './serializer/serializer.module';
import configuration from './config/configuration';
import routes from './config/routes.config';
import { SerializeInterceptor } from './serializer/serialize.interceptor';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configuration,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ApiModule,
    SerializerModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
          return new UnprocessableEntityException({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: errors.reduce(
              (acc, e) => ({
                ...acc,
                [e.property]: Object.values(e.constraints),
              }),
              {},
            ),
          });
        },
      }),
    },
  ],
})
export class AppModule {}
