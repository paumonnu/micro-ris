import { Permissions } from './permissions.decorator';
import { Reflector } from '@nestjs/core';
import { Permission } from '../permissions/entities/permission.entity';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class PermissionsGuard {
  constructor(
    // @InjectRepository(User)
    // protected readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check controller has permission decorator
    const permissions = this.reflector.getAllAndMerge(Permissions, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permissions.length) {
      return true;
    }

    // Check logged in user has permissions
    const { authInfo } = request;
    const isAllowed = await this.authService.hasPermissions(
      authInfo.permissions,
      permissions,
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        "You don't have permissions to perform this action",
      );
    }

    return true;
  }
}
