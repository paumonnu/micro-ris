import { applyDecorators, UseGuards } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { Permissions } from './permissions.decorator';
import { AuthTokenGuard } from './auth-token.guard';
import { PermissionsGuard } from './permission.guard';
import { AuthToken } from './auth-token.decorator';
import { VerifiedUserGuard } from './verified-user.guard';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    UseGuards(AuthTokenGuard, VerifiedUserGuard, PermissionsGuard),
    AuthToken(),
    Permissions(permissions),
  );
}
