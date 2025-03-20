import { parseISO } from 'date-fns';

export function formatDate(dateStr: string) {
  const date = parseISO(dateStr);
  return date.toLocaleString();
}
