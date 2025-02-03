import { Expose, Type } from 'class-transformer';

export interface PageMetaDtoParameters {
  page: number;
  take: number;
  count: number;
}

export class PaginationMeta {
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

  constructor({ page, take, count }: PageMetaDtoParameters) {
    this.page = page;
    this.take = take;
    this.count = count;
    this.pageCount = Math.ceil(this.count / this.take);
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

  constructor(data: T[], meta: PageMetaDtoParameters) {
    this.data = data;
    this.meta = new PaginationMeta(meta);
  }
}
