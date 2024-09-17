import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '../entities/base.entity';
import { ResourceDto } from './resource.dto';

export class PaginationMetaDto {
  @Expose()
  page: number;

  @Expose()
  take: number;

  @Expose()
  count: number;

  @Expose()
  pageCount: number;

  @Expose()
  hasPreviousPage: boolean;

  @Expose()
  hasNextPage: boolean;
}

export class PageDto<T extends BaseEntity> {
  @Expose()
  data: ResourceDto<T>[];

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
