import { applyDecorators, UseGuards } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { CrudPermissions, Permissions } from './permissions.decorator';
import { AuthTokenGuard } from './auth-token.guard';
import { PermissionsGuard } from './permission.guard';
import { AuthToken } from './auth-token.decorator';
import { VerifiedUserGuard } from './verified-user.guard';
import { AuthOptions, CrudAuth as DataUiCrudAuth } from '@dataui/crud';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    UseGuards(AuthTokenGuard, VerifiedUserGuard, PermissionsGuard),
    AuthToken(),
    Permissions(permissions),
  );
}

export interface CrudAuthOptions extends AuthOptions {
  permission: string;
}

export function CrudAuth(options: CrudAuthOptions) {
  const { permission, ...crudAuthOptions } = options;

  return applyDecorators(
    UseGuards(AuthTokenGuard, VerifiedUserGuard, PermissionsGuard),
    AuthToken(),
    CrudPermissions(permission),
    DataUiCrudAuth(crudAuthOptions),
  );
}
