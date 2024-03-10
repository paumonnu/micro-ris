class QueryConfig {
  private allowedOperators: string[];

  filters: object;
  include: string[] | null;
  skip: number;
  sort: string | string[];
  take: number;

  constructor(queryString?: string) {
    this.allowedOperators = ['eq', 'neq', 'gt', 'lt', 'gteq', 'lteq', 'in', 'nin', 'bt', 'nbt', 'lk', 'nlk'];

    this.filters = {};
    this.include = null;
    this.skip = 0;
    this.sort = 'id';
    this.take = 100;
  }
}

export default QueryConfig;
