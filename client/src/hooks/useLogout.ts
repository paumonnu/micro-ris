import { useQueryClient } from '@tanstack/react-query';
import { useStore } from './useStore';

export function useLogout(): () => void {
  const queryClient = useQueryClient();

  const { signOut, token } = useStore((state) => state.auth);

  const logout = () => {
    signOut();
    queryClient.removeQueries({
      queryKey: ['me'],
    });
  };

  return logout;
}
