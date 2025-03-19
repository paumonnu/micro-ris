import { ChevronDown, SlidersHorizontal } from 'lucide-react';
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

export type PaginatedListFiltersProps = {
  columns: Column<any>[];
  filterForm?: React.FunctionComponent;
};

export function PaginatedListFilters({
  columns,
  filterForm: FilterForm,
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          {FilterForm && (
            <SlidersHorizontal
              className="text-foreground cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            />
          )}
        </div>
      </div>
      {showFilters && FilterForm && (
        <div className="pb-4">
          <FilterForm />
        </div>
      )}
    </>
  );
}
