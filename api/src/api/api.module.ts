import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SerializerModule } from '../core/serializer/serializer.module';
import { SerializeInterceptor } from '../core/serializer/serialize.interceptor';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, SerializerModule],
  providers: [SerializeInterceptor],
})
export class ApiModule {}
