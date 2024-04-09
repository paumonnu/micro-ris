import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CRUDControllerFactory } from '../base/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/query-users.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('users')
// @Serialize(User)
export class UsersController extends CRUDControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto
>(CreateUserDto, UpdateUserDto, QueryUserDto) {
  constructor(private readonly service: UsersService) {
    super(service);
  }
}
