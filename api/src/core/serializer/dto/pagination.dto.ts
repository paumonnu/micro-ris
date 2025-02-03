import { Expose, Type } from 'class-transformer';

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

export class PageDto {
  constructor({ data, meta }) {
    this.data = data;
    this.meta = meta;
  }

  @Expose()
  data: ResourceDto[];

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
