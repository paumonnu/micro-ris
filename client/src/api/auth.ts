import { useStore } from '../hooks/useStore';
import { fetchApi } from './fetch';

export async function login(email: string, password: string): Promise<any> {
  const response = await fetchApi('auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await response.json();
}
