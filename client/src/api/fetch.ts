import { CreateQueryParams } from '@dataui/crud-request';
import { config } from '../config/config';
import { useStore } from '../hooks/useStore';
import { ResourcePageResponse } from '@/types/response';

export function fetchApi(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const { headers = [], ...partialOptions } = options;
  const token = useStore.getState().auth.token;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${config('api.apiUrl')}/${path}`, {
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...partialOptions,
  });
}

export async function fetchResource(
  resource: string,
  id: string,
  query?: CreateQueryParams,
): Promise<Response> {
  const response: Response = await fetchApi(`${resource}/${id}`, {
    method: 'GET',
  });

  return (await response.json()) as Response;
}

export async function fetchResourcePage<T>(
  resource: string,
  query?: string,
): Promise<ResourcePageResponse<T>> {
  const response = await fetchApi(`${resource}${query ? '?' + query : ''}`, {
    method: 'GET',
  });

  return (await response.json()) as ResourcePageResponse<T>;
}
