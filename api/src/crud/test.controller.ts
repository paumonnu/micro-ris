import { Controller } from '@nestjs/common';
import { User } from '../api/users/entities/user.entity';
import { QueryUserDto } from '../api/users/dto/query-users.dto';
import { CRUDControllerFactory } from './crud.-factory.controller';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { TestService } from './test.service';
import { UsersService } from '../api/users/users.service';

@Controller()
export class TestController extends CRUDControllerFactory<User>({
  basePath: 'api/resources',
  name: 'test',
  dtos: {
    read: QueryUserDto,
    readOne: null,
    create: CreateUserDto,
  },
}) {
  constructor(
    protected service: TestService,
    protected userService: UsersService,
  ) {
    super();

    this.init({
      service: service,
      relations: {
        info: {
          service: userService,
        },
      },
    });
  }
}
