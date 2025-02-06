import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudServiceFactory } from '@/src/common/crud.service';
import { QueryPermissiosnDto } from './dto/query-permissions.dto';

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
