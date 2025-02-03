import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { QueryRoleDto } from './dto/query-roles.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CRUDControllerFactory } from '@/src/core/crud.controller';

@Controller()
@UseGuards(AuthGuard)
export class RolesController extends CRUDControllerFactory<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto
>(Role, CreateRoleDto, UpdateRoleDto, QueryRoleDto) {
  constructor(private readonly service: RolesService) {
    super(service);
  }
}
