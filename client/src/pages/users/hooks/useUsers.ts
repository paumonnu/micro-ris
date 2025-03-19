import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/entities/user';
import { fetchApi } from '@/api/fetch';
import { ResourcePageResponse } from '@/types/response';
import { RequestQueryBuilder } from '@dataui/crud-request';

async function getUsers(filters = ''): Promise<ResourcePageResponse<User>> {
  const response = await fetchApi(`users?${filters}`);
  return (await response.json()) as ResourcePageResponse<User>;
}

export function useUsers() {
  const fallback = {
    data: [],
  };

  const queryString = RequestQueryBuilder.create({
    join: [{ field: 'info' }],
    page: 1,
    limit: 1,
  }).query();

  const { data = fallback } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(queryString),
  });

  const { data: users } = data;

  return { users };
}
