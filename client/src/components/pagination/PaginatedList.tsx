import {
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  ColumnFiltersState,
  PaginationState,
  SortingOptions,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SetStateAction, useCallback, useState } from 'react';
import { CreateQueryParams, QuerySortOperator } from '@dataui/crud-request';
import { ResourcePageResponse } from '@/types/response';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { Spinner } from '../ui/spinner';
import { UseQueryOptions } from '@tanstack/react-query';
import { merge } from 'ts-deepmerge';
import { PaginatedListPagination } from './PaginatedListPagination';
import { PaginatedListFilters } from './PaginatedListFilters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { PaginatedListFilterFormProps } from '@/types/filter-form-props';

export type TableColumnOptions<TData, TValue = unknown> = {
  key: string;
  name: string;
  cell: ColumnDefTemplate<CellContext<TData, TValue>>;
  sortable?: boolean;
  hideable?: boolean;
};

export type PaginatedListSort = {
  field: string;
  direction: 'ASC' | 'DESC';
};

export type PaginatedListRowAction<T> = {
  name: string;
  actionFn: (entity: T) => void | Promise<void>;
};

export type PaginatedListRowNavigate<T> = {
  name: string;
  navigateFn: (entity: T) => void | Promise<void>;
};

export interface PaginatedListProps<T> {
  resource: string;
  columnOptions: TableColumnOptions<T>[];
  checkable?: boolean;
  defaultFilters?: CreateQueryParams;
  defaultSort: PaginatedListSort[];
  useQueryOptions?: Partial<UseQueryOptions>;
  filterFormComponent?: React.FunctionComponent<PaginatedListFilterFormProps>;
  actions?: PaginatedListRowAction<T>[];
  navigate?: PaginatedListRowNavigate<T>[];
  fetchFn: <T>(
    resource: string,
    query?: string,
  ) => Promise<ResourcePageResponse<T>>;
}

export type BuildColumnsFromOptionsFnOptions<T> = {
  checkable?: boolean;
  actions?: PaginatedListRowAction<T>[];
  navigate?: PaginatedListRowNavigate<T>[];
};

function buildColumnsFromOptions<T>(
  columnOptions: TableColumnOptions<T>[],
  {
    checkable = true,
    actions = [],
    navigate = [],
  }: BuildColumnsFromOptionsFnOptions<T>,
): ColumnDef<T>[] {
  const colDefs: ColumnDef<T>[] = [];

  if (checkable) {
    colDefs.push({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  columnOptions.map((col) => {
    const { key, name, sortable = false, hideable = false, cell } = col;

    colDefs.push({
      accessorKey: key,
      id: key,
      header: ({ column }) => {
        if (!sortable) {
          return name;
        }

        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {name}

            {column.getIsSorted() &&
              (column.getIsSorted() == 'asc' ? <ArrowUp /> : <ArrowDown />)}
          </Button>
        );
      },
      enableSorting: sortable,
      enableHiding: hideable,
      cell: cell,
      meta: {
        name: name,
      },
    });
  });

  if (actions.length || navigate.length) {
    colDefs.push({
      id: 'actions',
      header: ({ table }) => 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!!actions.length && (
              <>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {actions.map((action) => (
                  <DropdownMenuItem
                    key={action.name}
                    onClick={() => action.actionFn}
                  >
                    {action.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
            {!!actions.length && !!navigate.length && <DropdownMenuSeparator />}
            {!!navigate.length && (
              <>
                {navigate.map((navigate) => (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    key={navigate.name}
                    onClick={() => {
                      navigate.navigateFn(row.original);
                    }}
                  >
                    {navigate.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  return colDefs;
}

export function PaginatedList<T>({
  resource,
  columnOptions,
  defaultSort,
  filterFormComponent,
  checkable = true,
  actions = [],
  navigate = [],
  defaultFilters = {},
  useQueryOptions = {},
}: PaginatedListProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const [filters, setFilters] = useState([]);

  const [sorting, setSorting] = useState<SortingState>(
    defaultSort.map((sort) => ({
      id: sort.field,
      desc: sort.direction === 'DESC',
    })),
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const queryFilters: CreateQueryParams = merge(defaultFilters, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filter: filters,
    sort: {
      field: sorting[0].id,
      order: (sorting[0].desc ? 'DESC' : 'ASC') as QuerySortOperator,
    },
  });

  const { data, isFetching } = usePaginatedQuery({
    resource,
    filters: queryFilters,
    useQueryOptions: useQueryOptions,
  });

  const pageData = data as ResourcePageResponse<T>;

  const columns = buildColumnsFromOptions(columnOptions, {
    checkable: checkable,
    actions: actions,
    navigate: navigate,
  });

  const handleSortChange = useCallback(
    (sort: SetStateAction<SortingState>) => {
      setSorting(sort);
      setPagination({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      });
    },
    [pagination.pageSize],
  );

  const table = useReactTable({
    data: pageData?.data ?? [],
    columns,
    onSortingChange: handleSortChange,
    enableMultiSort: false,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: true,
    autoResetPageIndex: false,
    pageCount: pageData?.pageCount ?? 0,
    initialState: {
      sorting: sorting,
      pagination: pagination,
    },
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      <PaginatedListFilters
        columns={table.getAllColumns().filter((column) => column.getCanHide())}
        filterFormComponent={filterFormComponent}
        onFiltersChange={(filters: []) => {
          setFilters(filters);
        }}
      />
      <div className="relative overflow-hidden">
        {isFetching && (
          <div className="absolute content-center items-center h-full w-full top-0 left-0 z-50 bg-background/75">
            <Spinner />
          </div>
        )}
        <div className="rounded-md border bg-white h-full overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`${index % 2 ? 'bg-zinc-100' : ''}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <PaginatedListPagination
        checkedCount={table.getFilteredSelectedRowModel().rows.length}
        rowCount={table.getFilteredRowModel().rows.length}
        page={pageData.page}
        pageCount={pageData.pageCount}
        pageSize={pagination.pageSize}
        onNextClick={() => table.nextPage()}
        onPrevClick={() => table.previousPage()}
        onPageClick={() => {}}
        onPageSizeChange={(value) => {
          setPagination({
            pageIndex: 0,
            pageSize: parseInt(value),
          });
        }}
      />
    </div>
  );
}
