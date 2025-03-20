import { BaseEntity } from './base';
import { User } from './user';

export interface Role extends BaseEntity {
  name: string;
  slug: string;
  users?: User[];
}
