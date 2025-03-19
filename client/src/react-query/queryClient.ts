import { QueryClient } from '@tanstack/react-query';

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: true,
    },
  },
});
