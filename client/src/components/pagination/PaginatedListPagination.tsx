import { Button } from '../ui/button';

export type PaginatedListPaginationProps = {
  checkedCount: number;
  rowCount: number;
  page: number;
  pageCount: number;
  onPageClick?: (page: number) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
};

export function PaginatedListPagination({
  page,
  pageCount,
  onPageClick,
  onNextClick,
  onPrevClick,
  checkedCount,
  rowCount,
}: PaginatedListPaginationProps) {
  return (
    <div className="flex items-center justify-end shrink-0 space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {checkedCount} of {rowCount} row(s) selected.
      </div>{' '}
      <div className="space-x-2">
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
