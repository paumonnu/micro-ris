import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterField, QueryDto } from '@/src/common/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  email: FilterField;
}
