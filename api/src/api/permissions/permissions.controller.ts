import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { exceptionFactory } from '@/src/validation/validation-exception-factory';
import { Auth } from '../auth/auth.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';

@Crud({
  model: {
    type: Permission,
  },
  params: {},
  query: {
    join: {},
  },
  validation: {
    exceptionFactory: exceptionFactory,
  },
  dto: {
    create: CreatePermissionDto,
    update: UpdatePermissionDto,
  },
  routes: {
    getManyBase: {
      // decorators: [Auth('resources.permissions.read')],
    },
    getOneBase: {
      // decorators: [Auth('resources.permissions.read')],
    },
    createManyBase: {
      // decorators: [Auth('resources.permissions.create')],
    },
    createOneBase: {
      // decorators: [Auth('resources.permissions.create')],
    },
    updateOneBase: {
      // decorators: [Auth('resources.permissions.update')],
    },
    deleteOneBase: {
      // decorators: [Auth('resources.permissions.delete')],
    },
  },
})
@Controller('permissions')
export class PermissionsController implements CrudController<Permission> {
  constructor(public service: PermissionsService) {}
}
