import { Expose, Type } from 'class-transformer';

export interface PageMetaParameters {
  page: number;
  limit: number;
  count: number;
}

export class PaginationMeta {
  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  pageCount: number;
}

export class Page<T> {
  constructor({ data, count, total, page, pageCount }) {
    this.data = data;
    this.count = count;
    this.total = total;
    this.page = page;
    this.pageCount = pageCount;
  }

  @Expose()
  data: T[];

  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  pageCount: number;
}
