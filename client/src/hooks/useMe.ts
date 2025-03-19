import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch';
import { useStore } from './useStore';
import { User } from '../types/entities/user';

async function getMe(): Promise<User> {
  const response = await fetchApi('auth/me');
  return (await response.json()) as User;
}

export function useMe() {
  const token = useStore((state) => state.auth.token);

  const fallback = {
    email: '',
    info: {
      firstName: '',
      lastName: '',
    },
  };

  const { data = fallback } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
  });

  return data;
}
