import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';
import { QueryManyResourcesDto } from '@/src/core/dto/query.dto';

export class QueryPermissiosnDto extends QueryManyResourcesDto {
  @IsFilterableField()
  name: string | object;

  @IsFilterableField()
  description: string | object;
}
