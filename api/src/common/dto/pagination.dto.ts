import { Expose, Type } from 'class-transformer';

export interface PageMetaParameters {
  page: number;
  limit: number;
  count: number;
}

export class PaginationMeta {
  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  count: number;

  @Expose()
  pageCount: number;

  @Expose()
  hasPreviousPage: boolean;

  @Expose()
  hasNextPage: boolean;

  constructor({ page, limit, count }: PageMetaParameters) {
    this.page = page;
    this.limit = limit;
    this.count = count;
    this.pageCount = Math.ceil(this.count / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class Page<T> {
  @Expose()
  data: T[];

  @Expose()
  @Type(() => PaginationMeta)
  meta: PaginationMeta;

  constructor(data: T[], meta: PageMetaParameters) {
    this.data = data;
    this.meta = new PaginationMeta(meta);
  }
}
