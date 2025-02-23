import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsJSON,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class FilterField {
  @IsString()
  @IsOptional()
  eq: string;

  @IsString()
  @IsOptional()
  nt: string;

  @IsString()
  @IsOptional()
  lt: string;

  @IsString()
  @IsOptional()
  gt: string;

  @IsString()
  @IsOptional()
  lte: string;

  @IsString()
  @IsOptional()
  gte: string;

  @IsString()
  @IsOptional()
  lk: string;

  @IsString()
  @IsOptional()
  bt: string;

  @IsString()
  @IsOptional()
  in: string;
}

export class QueryOneDto {
  @IsOptional()
  include: string;
}

export class QueryManyDto {
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(250)
  @Transform(({ value }) => parseInt(value))
  limit: number = 25;

  @IsOptional()
  sort: string = '-id';

  @IsOptional()
  include: string;
}
