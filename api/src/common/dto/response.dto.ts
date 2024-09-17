import { Expose, Transform } from 'class-transformer';
import { PaginationMetaDto } from './serialize.dto';
import { format } from 'date-fns';

interface ApiResponseParams {
  status: number;
}

interface ResourceResponseParams extends ApiResponseParams {
  data: object | [];
  pagination?: PaginationMetaDto;
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
  status: number;

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

export class ResourceResponseDto extends ApiResponseDto {
  constructor({ status, data, pagination }: ResourceResponseParams) {
    super({ status });

    this.data = data;
    this.pagination = pagination;
  }

  @Expose()
  data: object | [];

  @Expose()
  pagination?: PaginationMetaDto;
}
