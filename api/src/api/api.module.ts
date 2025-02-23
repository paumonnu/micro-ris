import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SerializerModule } from '../serializer/serializer.module';
import { ValidationModule } from '../validation/validation.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    SerializerModule,
    ValidationModule,
  ],
  providers: [],
})
export class ApiModule {}
