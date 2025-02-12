import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRoleDto } from './dto/query-roles.dto';
import { CrudServiceFactory } from '@/src/crud/crud.service';

@Injectable()
export class RolesService extends CrudServiceFactory<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto
>() {
  constructor(
    @InjectRepository(Role)
    protected readonly repository: Repository<Role>,
  ) {
    super(repository);
  }
}
