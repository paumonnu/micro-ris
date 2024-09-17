import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { typeOrmConfig } from './config/database/typeorm.config';
import { ResourceModule } from './modules/resources/resources.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ResourceModule, AuthModule],
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
