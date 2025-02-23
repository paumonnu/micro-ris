import { QueryManyDto } from '@/src/shared/dto/query.dto';

export class QueryPermissiosnDto extends QueryManyDto {
  name: string | object;

  description: string | object;
}
