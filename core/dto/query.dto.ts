import { BadRequestException } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
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
} from "class-validator";

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

export class QueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  id: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  createdAt: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  updatedAt: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterField)
  deletedAt: string;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  take: number = 25;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return (value as string).split(",");
  })
  sort: string[] = ["id"];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return (value as string).split(",");
  })
  fields: string[] = [];
}
