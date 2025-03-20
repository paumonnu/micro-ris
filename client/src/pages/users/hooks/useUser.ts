import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/entities/user';
import { fetchApi } from '@/api/fetch';
import { ResourcePageResponse } from '@/types/response';
import { RequestQueryBuilder } from '@dataui/crud-request';

async function getUser(id: string, filters = ''): Promise<User> {
  const response = await fetchApi(`users/${id}?${filters}`);
  return (await response.json()) as User;
}

export function useUser(id: string) {
  const filters = {
    join: [{ field: 'info' }, { field: 'role' }, { field: 'role.permissions' }],
  };

  const queryString = RequestQueryBuilder.create(filters).query();

  const { data: user, isLoading } = useQuery({
    queryKey: ['users', id, filters],
    queryFn: () => getUser(id, queryString),
  });

  return { user, isLoading };
}
