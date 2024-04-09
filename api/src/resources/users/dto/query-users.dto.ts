import { IsOptional } from 'class-validator';
import { FilterField, QueryDto } from 'src/resources/base/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @IsOptional()
  test: FilterField | string;
}
