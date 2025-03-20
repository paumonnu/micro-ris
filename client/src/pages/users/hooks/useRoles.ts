import { fetchResourcePage } from '@/api/fetch';
import { Role } from '@/types/entities/role';
import { ResourcePageResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

async function getRoles(): Promise<ResourcePageResponse<Role>> {
  const response = await fetchResourcePage(`roles`);
  return response as ResourcePageResponse<Role>;
}

export function useRoles() {
  const fallback = {
    data: [],
  };
  const { data = fallback, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });

  return { roles: data.data as Role[], isLoading };
}
