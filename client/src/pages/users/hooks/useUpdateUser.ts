import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/entities/user';
import { fetchApi } from '@/api/fetch';

async function updateUser(id: string, fields: object): Promise<User> {
  const response = await fetchApi(`users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(fields),
  });
  return (await response.json()) as User;
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['users', id],
    mutationFn: (fields: object) => updateUser(id, fields),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', id],
      });
    },
  });

  return mutation;
}
