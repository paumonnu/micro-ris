import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SerializerModule } from '../serializer/serializer.module';
import { SerializeInterceptor } from '../serializer/serialize.interceptor';
import { ValidationModule } from '../validation/validation.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    SerializerModule,
    ValidationModule,
  ],
  providers: [SerializeInterceptor],
})
export class ApiModule {}
