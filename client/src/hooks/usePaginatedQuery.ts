import { fetchResourcePage } from '@/api/fetch';
import { ResourcePageResponse } from '@/types/response';
import { CreateQueryParams, RequestQueryBuilder } from '@dataui/crud-request';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type UsePaginatedQueryOptions<T> = {
  resource: string;
  filters?: CreateQueryParams;
  useQueryOptions?: Partial<UseQueryOptions>;
};

export function usePaginatedQuery<T>({
  resource,
  filters = {},
  useQueryOptions = {},
}: UsePaginatedQueryOptions<T>): UseQueryResult<T> {
  const queryStr = RequestQueryBuilder.create(filters).query();

  const fallbackData = {
    data: [],
    count: 0,
    total: 0,
    page: 0,
    pageCount: 0,
  };

  const { data = fallbackData, ...restQueryResults } = useQuery({
    queryKey: [resource, filters],
    placeholderData: (prev) => prev,
    queryFn: () => fetchResourcePage(resource, queryStr),
    ...useQueryOptions,
  });

  return { data, ...restQueryResults } as UseQueryResult<T>;
}
