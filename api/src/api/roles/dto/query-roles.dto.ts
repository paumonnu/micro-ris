import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';
import { QueryManyDto } from '@/src/core/dto/query.dto';

export class QueryRoleDto extends QueryManyDto {
  @IsFilterableField()
  name: string | object;
}
