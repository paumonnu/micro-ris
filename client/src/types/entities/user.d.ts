import { BaseEntity } from './base';
import { Role } from './role';
import { UserInfo } from './user-info';

export interface User extends BaseEntity {
  email: string;
  role: Role;
  info: UserInfo;
}
