import {
  PaginatedList,
  TableColumnOptions,
} from '../../components/pagination/PaginatedList';
import PageListLayout from '@/components/layout/PageListLayout';
import { User } from '@/types/entities/user';
import { fetchResourcePage } from '@/api/fetch';
import { UsersListFilterForm } from './UsersListFilterForm';

function UsersListPage() {
  const userColumns: TableColumnOptions<User>[] = [
    {
      key: 'email',
      name: 'Email',
      hideable: true,
      cell: ({ row }) => row.getValue('email'),
    },
    {
      key: 'name',
      name: 'Name',
      hideable: true,
      sortable: true,
      cell: ({ row }) => {
        return `${row.original.info?.firstName} ${row.original.info?.lastName}`;
      },
    },
    {
      key: 'role',
      name: 'Role',
      hideable: true,
      sortable: true,
      cell: ({ row }) => {
        return `${row.original.role?.name}`;
      },
    },
    {
      key: 'actions',
      name: 'Actions',
      sortable: false,
      cell: ({ row }) => {
        return `${row.original.info?.firstName} ${row.original.info?.lastName}`;
      },
    },
  ];

  return (
    <PageListLayout fullWidth={false} title="Users">
      <PaginatedList
        columnOptions={userColumns}
        fetchFn={fetchResourcePage}
        filterForm={UsersListFilterForm}
        useQueryOptions={{
          staleTime: 10000,
        }}
        defaultFilters={{ join: [{ field: 'info' }, { field: 'role' }] }}
        resource="users"
      />
    </PageListLayout>
  );
}

export default UsersListPage;
