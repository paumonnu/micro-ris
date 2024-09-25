import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CRUDControllerFactory } from '@/src/common/controllers/crud.controller';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/query-users.dto';

@Controller()
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
