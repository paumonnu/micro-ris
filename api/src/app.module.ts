import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { typeOrmConfig } from './database/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        // transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class AppModule {}
