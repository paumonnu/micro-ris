import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { exceptionFactory } from '@/src/validation/validation-exception-factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CrudAuth } from '../auth/auth.decorator';

@Crud({
  model: {
    type: User,
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
    create: CreateUserDto,
    update: UpdateUserDto,
  },
})
// @CrudAuth({
//   permission: 'resources.users',
// })
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
