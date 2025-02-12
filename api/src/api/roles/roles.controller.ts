import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { QueryRoleDto } from './dto/query-roles.dto';
import { AuthTokenGuard } from '../auth/auth-token.guard';
import { CRUDControllerFactory } from '@/src/crud/crud.controller';

@Controller()
@UseGuards(AuthTokenGuard)
export class RolesController extends CRUDControllerFactory<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto
>('roles', Role, CreateRoleDto, UpdateRoleDto, QueryRoleDto) {
  constructor(private readonly service: RolesService) {
    super(service);
  }
}
