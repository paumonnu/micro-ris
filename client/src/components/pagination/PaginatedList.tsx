import {
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { CreateQueryParams, QuerySortOperator } from '@dataui/crud-request';
import { ResourcePageResponse } from '@/types/response';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { Spinner } from '../ui/spinner';
import { UseQueryOptions } from '@tanstack/react-query';
import { merge } from 'ts-deepmerge';
import { PaginatedListPagination } from './PaginatedListPagination';
import { PaginatedListFilters } from './PaginatedListFilters';

export type TableColumnOptions<TData, TValue = unknown> = {
  key: string;
  name: string;
  cell: ColumnDefTemplate<CellContext<TData, TValue>>;
  sortable?: boolean;
  hideable?: boolean;
};

export interface PaginatedListProps<T> {
  resource: string;
  columnOptions: TableColumnOptions<T>[];
  checkable?: boolean;
  defaultFilters?: CreateQueryParams;
  useQueryOptions?: Partial<UseQueryOptions>;
  filterForm?: React.FunctionComponent;
  fetchFn: <T>(
    resource: string,
    query?: string,
  ) => Promise<ResourcePageResponse<T>>;
}

function buildColumnsFromOptions<T>(
  columnOptions: TableColumnOptions<T>[],
  checkable: boolean = true,
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
            <ArrowUpDown />
          </Button>
        );
      },
      enableSorting: sortable,
      enableHiding: hideable,
      cell: cell,
    });
  });

  return colDefs;
}

export function PaginatedList<T>({
  resource,
  columnOptions,
  filterForm,
  checkable = true,
  defaultFilters = {},
  useQueryOptions = {},
}: PaginatedListProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const queryFilters = merge(defaultFilters, {
    sort: {
      field: sorting[0].id,
      order: (sorting[0].desc ? 'DESC' : 'ASC') as QuerySortOperator,
    },
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const { data, isFetching } = usePaginatedQuery({
    resource,
    filters: queryFilters,
    useQueryOptions: useQueryOptions,
  });

  const pageData = data as ResourcePageResponse<T>;

  const columns = buildColumnsFromOptions(columnOptions, checkable);

  const table = useReactTable({
    data: pageData?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    autoResetPageIndex: false,
    pageCount: pageData?.pageCount ?? 0,
    initialState: {
      sorting: sorting,
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
        filterForm={filterForm}
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
        onNextClick={() => table.nextPage()}
        onPrevClick={() => table.previousPage()}
        onPageClick={() => {}}
      />
    </div>
  );
}
