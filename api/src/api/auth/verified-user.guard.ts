import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthInfo } from './dto/auth-info.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  constructor(private readonly cls: ClsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authInfo = this.cls.get('authInfo') as AuthInfo;

    if (!authInfo.user.verifiedAt) {
      throw new ForbiddenException(
        'Your registration has not yet been confirmed. Please, check your email.',
      );
    }

    return true;
  }
}
