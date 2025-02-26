import { useQuery } from '@tanstack/react-query';
import { fetchResources } from '../api/queries';
import PaginatedList from '../layout/PaginatedList';

function UsersListPage() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<any> => {
      const response = await fetchResources('users');
      return await response.json();
    },
  });

  return <>Users</>;
}

export default UsersListPage;
