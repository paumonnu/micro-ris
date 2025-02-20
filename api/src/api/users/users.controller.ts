import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CRUDControllerFactory } from '@/src/crud/crud.controller';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/query-users.dto';
import { RelationshipsUserDto } from './dto/relationships-user.dto';

@Controller()
export class UsersController extends CRUDControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto,
  RelationshipsUserDto
>(
  'users',
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto,
  RelationshipsUserDto,
) {
  constructor(private readonly service: UsersService) {
    super();
  }
}
