import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryUserDto } from './dto/query-users.dto';
import { CrudServiceFactory } from '@/src/core/crud.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends CrudServiceFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto
>() {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }
}
