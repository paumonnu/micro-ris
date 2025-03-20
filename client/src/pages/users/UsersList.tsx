import {
  PaginatedList,
  TableColumnOptions,
} from '../../components/pagination/PaginatedList';
import PageListLayout from '@/components/layout/PageListLayout';
import { User } from '@/types/entities/user';
import { fetchResourcePage } from '@/api/fetch';
import { formatDate } from '@/utils/dates';
import { useNavigate } from 'react-router';
import { useRoles } from './hooks/useRoles';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input-custom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback } from 'react';
import { filterChangedFormFields } from '@/utils/rhf';
import { RequestQueryBuilder } from '@dataui/crud-request';
import { PaginatedListFilterFormProps } from '@/types/filter-form-props';

const userFilterFormSchema = z.object({
  roleId: z.string().optional(),
});

function UsersListFilterForm({
  onFiltersChange,
}: PaginatedListFilterFormProps) {
  const { roles } = useRoles();

  const form = useForm<z.infer<typeof userFilterFormSchema>>({
    resolver: zodResolver(userFilterFormSchema),
    defaultValues: {
      roleId: '',
    },
  });

  const { formState } = form;
  const { dirtyFields } = formState;

  const handleSubmit = useCallback(
    (values: z.infer<typeof userFilterFormSchema>) => {
      const filters: object[] = [];

      if (dirtyFields.roleId && values.roleId) {
        filters.push({
          field: 'role.id',
          operator: '$eq',
          value: values.roleId,
        });
      }

      onFiltersChange(filters);
    },
    [dirtyFields, onFiltersChange],
  );

  const handleReset = useCallback(async () => {
    form.reset();
    await form.handleSubmit(handleSubmit)();
  }, [form, handleSubmit]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 flex flex-col "
        >
          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null as any}>-</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mr-auto space-x-2">
            <Button type="submit">Filter</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

function UsersListPage() {
  const navigate = useNavigate();

  const userColumns: TableColumnOptions<User>[] = [
    {
      key: 'id',
      name: 'Id',
      hideable: true,
      sortable: true,
      cell: ({ row }) => row.getValue('id'),
    },
    {
      key: 'email',
      name: 'Email',
      hideable: true,
      sortable: true,
      cell: ({ row }) => row.getValue('email'),
    },
    {
      key: 'info.firstName',
      name: 'Name',
      hideable: true,
      sortable: true,
      cell: ({ row }) => {
        return `${row.original.info?.firstName} ${row.original.info?.lastName}`;
      },
    },
    {
      key: 'role.name',
      name: 'Role',
      hideable: true,
      sortable: true,
      cell: ({ row }) => {
        return `${row.original.role?.name}`;
      },
    },
    {
      key: 'createdAt',
      name: 'Created at',
      hideable: true,
      sortable: true,
      cell: ({ row }) => {
        return formatDate(row.getValue('createdAt'));
      },
    },
  ];

  return (
    <PageListLayout fullWidth={false} title="Users">
      <PaginatedList
        columnOptions={userColumns}
        fetchFn={fetchResourcePage}
        filterFormComponent={UsersListFilterForm}
        navigate={[
          {
            name: 'Edit',
            navigateFn: async (entity) => {
              await navigate(`/users/${entity.id}`);
            },
          },
        ]}
        defaultSort={[
          {
            field: 'createdAt',
            direction: 'DESC',
          },
        ]}
        useQueryOptions={{
          staleTime: 0,
        }}
        defaultFilters={{
          join: [{ field: 'info' }, { field: 'role' }],
          sort: {
            field: 'createdAt',
            order: 'ASC',
          },
        }}
        resource="users"
      />
    </PageListLayout>
  );
}

export default UsersListPage;
