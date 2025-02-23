import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { exceptionFactory } from '@/src/validation/validation-exception-factory';
import { Auth } from '../auth/auth.decorator';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Crud({
  model: {
    type: Role,
  },
  params: {},
  query: {
    join: {
      info: {},
      role: {},
      ['role.permissions']: {},
    },
  },
  validation: {
    exceptionFactory: exceptionFactory,
  },
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto,
  },
  routes: {
    getManyBase: {
      // decorators: [Auth('resources.roles.read')],
    },
    getOneBase: {
      // decorators: [Auth('resources.roles.read')],
    },
    createManyBase: {
      // decorators: [Auth('resources.roles.create')],
    },
    createOneBase: {
      // decorators: [Auth('resources.roles.create')],
    },
    updateOneBase: {
      // decorators: [Auth('resources.roles.update')],
    },
    deleteOneBase: {
      // decorators: [Auth('resources.roles.delete')],
    },
  },
})
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}
}
