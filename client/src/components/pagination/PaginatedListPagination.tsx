import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type PaginatedListPaginationProps = {
  checkedCount: number;
  rowCount: number;
  page: number;
  pageCount: number;
  pageSize: number;
  onPageClick?: (page: number) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
  onPageSizeChange: (value: string) => void;
};

export function PaginatedListPagination({
  page,
  pageCount,
  onPageClick,
  onNextClick,
  onPrevClick,
  checkedCount,
  rowCount,
  onPageSizeChange,
  pageSize = 25,
}: PaginatedListPaginationProps) {
  return (
    <div className="flex items-center justify-end shrink-0 space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {checkedCount} of {rowCount} row(s) selected.
      </div>
      <div className="flex space-x-2">
        <Select value={pageSize.toString()} onValueChange={onPageSizeChange}>
          <SelectTrigger className="">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="250">250</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevClick}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextClick}
          disabled={page >= pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
