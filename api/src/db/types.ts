import { NotificationTable } from './schemas/Notification.js';
import { UserTable } from './schemas/User.js';

export interface Database {
  notification: NotificationTable;
  user: UserTable;
}
