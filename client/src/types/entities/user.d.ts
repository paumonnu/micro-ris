import { Role } from './role';
import { UserInfo } from './user-info';

export type User = {
  email: string;
  role?: Role;
  info?: UserInfo;
};
