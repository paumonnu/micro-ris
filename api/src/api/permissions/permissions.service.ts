import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService extends TypeOrmCrudService<Permission> {
  constructor(@InjectRepository(Permission) repo) {
    super(repo);
  }
}
