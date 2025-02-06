import { QueryManyDto } from '@/src/common/dto/query.dto';

export class QueryPermissiosnDto extends QueryManyDto {
  name: string | object;

  description: string | object;
}
