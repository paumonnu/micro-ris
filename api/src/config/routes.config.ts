import { ApiModule } from '../api/api.module';
import { AuthModule } from '../api/auth/auth.module';
import { PermissionsModule } from '../api/permissions/permissions.module';
import { RolesModule } from '../api/roles/roles.module';
import { UsersModule } from '../api/users/users.module';

export default [
  {
    path: 'api',
    module: ApiModule,
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'resources',
        children: [
          {
            path: 'users',
            module: UsersModule,
          },
          {
            path: 'permissions',
            module: PermissionsModule,
          },
          {
            path: 'roles',
            module: RolesModule,
          },
        ],
      },
    ],
  },
];
