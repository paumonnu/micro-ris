import { Controller, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissiosnDto } from './dto/query-permissions.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CRUDControllerFactory } from '@/src/common/crud.controller';

@Controller()
@UseGuards(AuthGuard)
export class PermissionsController extends CRUDControllerFactory<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissiosnDto
>(Permission, CreatePermissionDto, UpdatePermissionDto, QueryPermissiosnDto) {
  constructor(private readonly service: PermissionsService) {
    super(service);
  }
}
