import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';
import { PaginationMetaDto } from './pagination.dto';
import { ResourceDto } from './resource.dto';
import { isArray } from 'class-validator';

interface ApiResponseParams {
  status: number;
}

interface ResourceResponseParams extends ApiResponseParams {
  data: ResourceDto | ResourceDto[];
  includes?: ResourceDto[];
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
  data: ResourceDto | ResourceDto[];

  @Expose()
  @Transform(({ value, key, obj, type }) => {
    const getIncludes = (resource: ResourceDto) => {
      const relationships = resource.relationships;
      const includes = [];

      Object.keys(resource.relationships).map((relKey) => {
        if (Array.isArray(relationships[relKey])) {
          return relationships[relKey].map((relation) => {
            includes.push(relation);
          });
        }

        includes.push(relationships[relKey]);
      });

      return includes;
    };

    const includes = getIncludes(obj.data);

    return includes;
  })
  includes?: ResourceDto[];

  @Expose()
  pagination?: PaginationMetaDto;
}
