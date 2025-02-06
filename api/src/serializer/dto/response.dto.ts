import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';
import { Resource } from './resource.dto';
import { isArray } from 'class-validator';
import { PaginationMeta } from '@/src/common/dto/pagination.dto';

interface ApiResponseParams {
  status: number;
}

interface ResourceResponseParams extends ApiResponseParams {
  data: Resource | Resource[];
  includes?: Resource[];
  pagination?: PaginationMeta;
}

interface ErrorResponseParams extends ApiResponseParams {
  message: string;
  errors?: any;
}

export class ApiResponseDto {
  constructor({ status }: ApiResponseParams) {
    this.status = status;
  }

  @Expose()
  status: number = 200;

  @Expose()
  @Transform(() => format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'))
  timestamp: string;

  @Expose()
  version: string = '0.1.0';
}

export class ErrorResponseDto extends ApiResponseDto {
  constructor({ status, message, errors }: ErrorResponseParams) {
    super({ status });

    this.message = message;
    this.errors = errors;
  }

  @Expose()
  message: string;

  @Expose()
  errors?: any;
}

export class SuccessResponseDto extends ApiResponseDto {
  constructor({ status, data, includes, pagination }: ResourceResponseParams) {
    super({ status });

    this.data = data;
    this.includes = includes;
    this.pagination = pagination;
  }

  @Expose()
  data: Resource | Resource[];

  @Expose()
  includes?: Resource[];

  @Expose()
  pagination?: PaginationMeta;
}
