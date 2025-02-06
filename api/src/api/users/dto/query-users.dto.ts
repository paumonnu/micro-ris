import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterField, QueryManyDto } from '@/src/common/dto/query.dto';

export class QueryUserDto extends QueryManyDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  email: FilterField;
}
