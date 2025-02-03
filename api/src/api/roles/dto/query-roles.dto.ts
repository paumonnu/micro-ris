import { QueryManyResourcesDto } from '@/src/core/dto/query.dto';
import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';

export class QueryRoleDto extends QueryManyResourcesDto {
  @IsFilterableField()
  name: string | object;
}
