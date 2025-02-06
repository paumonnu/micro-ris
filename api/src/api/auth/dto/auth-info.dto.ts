import { User } from '../../users/entities/user.entity';

export class AuthInfo {
  constructor(private readonly authUser: User) {}

  public get id() {
    return this.user.id;
  }

  public get user() {
    return this.authUser;
  }

  public get role() {
    return this.user.role;
  }

  public get permissions() {
    return this.role.permissions;
  }
}
