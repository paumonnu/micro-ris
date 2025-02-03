import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';
import { QueryManyDto } from '@/src/core/dto/query.dto';

export class QueryPermissiosnDto extends QueryManyDto {
  @IsFilterableField()
  name: string | object;

  @IsFilterableField()
  description: string | object;
}
