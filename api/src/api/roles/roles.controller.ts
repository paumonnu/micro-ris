import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { QueryRoleDto } from './dto/query-roles.dto';
import { AuthTokenGuard } from '../auth/auth-token.guard';
import { CRUDControllerFactory } from '@/src/crud/crud.controller';
import { RelationshipsDto } from '@/src/common/dto/relationships.dto';

@Controller()
@UseGuards(AuthTokenGuard)
export class RolesController extends CRUDControllerFactory<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto,
  RelationshipsDto
>('roles', Role, CreateRoleDto, UpdateRoleDto, QueryRoleDto, RelationshipsDto) {
  constructor(private readonly service: RolesService) {
    super(service);
  }
}
