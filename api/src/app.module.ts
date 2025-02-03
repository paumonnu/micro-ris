import {
  Module,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  RouterModule,
} from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import configuration from './config/configuration';
import routes from './config/routes.config';
import { PermissionsGuard } from './api/auth/permission.guard';
import { AuthGuard } from './api/auth/auth.guard';
import { SerializerModule } from './core/serializer/serializer.module';
import { ResponseInterceptor } from './core/serializer/response.interceptor';

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
    // ValidationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     transform: true,
    //     exceptionFactory: (errors) => {
    //       return new UnprocessableEntityException({
    //         statusCode: 422,
    //         error: 'Unprocessable Entity',
    //         message: errors.reduce(
    //           (acc, e) => ({
    //             ...acc,
    //             [e.property]: Object.values(e.constraints),
    //           }),
    //           {},
    //         ),
    //       });
    //     },
    //   }),
    // },
  ],
})
export class AppModule {}
