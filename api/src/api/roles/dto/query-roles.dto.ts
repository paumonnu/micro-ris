import { QueryManyDto } from '@/src/common/dto/query.dto';

export class QueryRoleDto extends QueryManyDto {
  name: string | object;
}
