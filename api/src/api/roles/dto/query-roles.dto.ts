import { QueryManyDto } from '@/src/shared/dto/query.dto';

export class QueryRoleDto extends QueryManyDto {
  name: string | object;
}
