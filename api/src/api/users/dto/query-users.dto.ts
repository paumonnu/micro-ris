import { QueryManyResourcesDto } from '@/src/core/dto/query.dto';
import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';

export class QueryUserDto extends QueryManyResourcesDto {
  @IsFilterableField()
  email: string | object;
}
