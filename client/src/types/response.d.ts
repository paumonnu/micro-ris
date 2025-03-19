export interface Response {
  status: number;
  data: any;
  timestamp: string;
}

export interface ResourcePageResponse<T> extends Response {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}
