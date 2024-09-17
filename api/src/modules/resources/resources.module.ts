import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from '@/src/common/guards/authentication.guard';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class ResourceModule {}
