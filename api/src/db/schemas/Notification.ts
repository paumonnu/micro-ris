import { Generated, Insertable, Selectable, Updateable } from 'kysely';
import { Resource, WithTimestamps, WithSoftDeletes, WithAuthor } from '@db/schemas/tableTemplates.js';

export interface NotificationTable extends Resource, WithTimestamps, WithSoftDeletes, WithAuthor {
  id: Generated<number>;

  title: string;
  description: string;
}

export type Notification = Selectable<NotificationTable>;
export type NewNotification = Insertable<NotificationTable>;
export type NotificationUpdate = Updateable<NotificationTable>;
