import { Controller, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissiosnDto } from './dto/query-permissions.dto';
import { AuthTokenGuard } from '../auth/auth-token.guard';
import { CRUDControllerFactory } from '@/src/crud/crud.controller';
import { RelationshipsDto } from '@/src/common/dto/relationships.dto';

@Controller()
@UseGuards(AuthTokenGuard)
export class PermissionsController extends CRUDControllerFactory<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissiosnDto,
  RelationshipsDto
>(
  'permissions',
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissiosnDto,
  RelationshipsDto,
) {
  constructor(private readonly service: PermissionsService) {
    super(service);
  }
}
