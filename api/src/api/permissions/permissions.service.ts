import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissiosnDto } from './dto/query-permissions.dto';
import { CrudServiceFactory } from '../../core/crud.service';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService extends CrudServiceFactory<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissiosnDto
>() {
  constructor(
    @InjectRepository(Permission)
    protected readonly repository: Repository<Permission>,
  ) {
    super(repository);
  }
}
