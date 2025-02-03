import { IsFilterableField } from '@/src/core/decorators/filterable-field.decorator';
import { QueryManyDto } from '@/src/core/dto/query.dto';

export class QueryUserDto extends QueryManyDto {
  @IsFilterableField()
  email: string | object;
}
