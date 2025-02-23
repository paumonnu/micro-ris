import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { exceptionFactory } from '@/src/validation/validation-exception-factory';
import { Auth } from '../auth/auth.decorator';
import { Permission } from '../permissions/entities/permission.entity';
import { PermissionsService } from '../permissions/permissions.service';

@Crud({
  model: {
    type: Permission,
  },
  params: {
    roleId: {
      field: 'roles.id',
      type: 'uuid',
    },
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      roles: {
        eager: true,
        select: false,
        required: false,
      },
    },
  },
})
@Controller('/roles/:roleId/permissions')
export class RolePermissionsController implements CrudController<Permission> {
  constructor(public service: PermissionsService) {}
}
