import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsJSON,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export interface FilterField {
  eq?: any;
  lt?: any;
  gt?: any;
}

export class QueryDto {
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  perPage: number = 25;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return (value as string).split(',');
  })
  sort: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return (value as string).split(',');
  })
  fields: string[] = [];

  // @IsJSON()
  // @IsOptional()
  // filters: string;
}
