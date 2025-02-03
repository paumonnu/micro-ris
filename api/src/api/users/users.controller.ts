import { UpdateUserDto } from './dto/update-user.dto';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/query-users.dto';
import { Permissions } from '../auth/permissions.decorator';
import { Secured } from '../auth/secured.decorator';
import { CRUDControllerFactory } from '@/src/core/crud.controller';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
@Secured()
@Permissions(['resources.users.manage'])
export class UsersController extends CRUDControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto
>(User, CreateUserDto, UpdateUserDto, QueryUserDto) {
  constructor(private readonly service: UsersService) {
    super(service);
  }
}
