import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch';
import { useStore } from './useStore';
import { User } from '../types/entities/user';
import { jwtDecode } from 'jwt-decode';

async function getMe(): Promise<User> {
  const response = await fetchApi('auth/me');
  return (await response.json()) as User;
}

export function useMe() {
  const token = useStore((state) => state.auth.token);

  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  const { data } = useQuery({
    queryKey: ['users', decoded.sub as any],
    queryFn: getMe,
    enabled: !!token,
  });

  return data;
}
