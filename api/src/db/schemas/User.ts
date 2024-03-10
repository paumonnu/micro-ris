import { Generated, Insertable, Selectable, Updateable } from 'kysely';
import { Resource, WithTimestamps, WithSoftDeletes } from '@db/schemas/tableTemplates.js';

export interface UserTable extends Resource, WithTimestamps, WithSoftDeletes {
  id: Generated<number>;

  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export type Notification = Selectable<UserTable>;
export type NewNotification = Insertable<UserTable>;
export type NotificationUpdate = Updateable<UserTable>;
