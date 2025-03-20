import { ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Column } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { useState } from 'react';
import { CreateQueryParams } from '@dataui/crud-request';
import { PaginatedListFilterFormProps } from '@/types/filter-form-props';

export type PaginatedListFiltersProps = {
  columns: Column<any>[];
  filterFormComponent?: React.FunctionComponent<PaginatedListFilterFormProps>;
  onFiltersChange?: (filters) => void;
};

export function PaginatedListFilters({
  columns,
  onFiltersChange,
  filterFormComponent: FilterFormComponent,
}: PaginatedListFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-4">
        <div>
          <Input placeholder="Search" className="max-w-sm bg-white" />
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" bg-white">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta
                      ? (column.columnDef.meta as any).name
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          {FilterFormComponent && (
            <SlidersHorizontal
              className="text-foreground cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            />
          )}
        </div>
      </div>
      {showFilters && FilterFormComponent && onFiltersChange && (
        <div className="pb-4">
          <FilterFormComponent onFiltersChange={onFiltersChange} />
        </div>
      )}
    </>
  );
}
