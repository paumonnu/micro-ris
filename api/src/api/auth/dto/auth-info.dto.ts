import { User } from '../../users/entities/user.entity';

export class AuthInfo {
  constructor(private readonly user: User) {}
}
