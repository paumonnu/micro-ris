import { ColumnType } from 'kysely';

export interface Resource {}

export interface WithSoftDeletes {
  deletedAt: ColumnType<Date, never, string | undefined>;
}

export interface WithTimestamps {
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, string>;
}

export interface WithAuthor {
  createdBy: ColumnType<Date, string | undefined, never>;
}
