import { User } from './user';

export type Role = {
  name: string;
  slug: string;
  users?: User[];
};
