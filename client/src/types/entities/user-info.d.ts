import { BaseEntity } from './base';
import { User } from './user';

export interface UserInfo extends BaseEntity {
  firstName: string;
  lastName: string;
  user?: User;
}
