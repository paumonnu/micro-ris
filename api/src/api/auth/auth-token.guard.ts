import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthInfo } from './dto/auth-info.dto';
import { AuthToken } from './auth-token.decorator';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly cls: ClsService,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check Secured decorator
    const securedHandler = this.reflector.get(AuthToken, context.getHandler());
    const securedClass = this.reflector.get(AuthToken, context.getClass());

    if (!securedHandler && !securedClass) {
      return true;
    }

    // take token from headers
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'No Bearer access token found in Authorization header',
      );
    }

    let payload;

    try {
      payload = (await this.authService.validateToken(token)) as any;
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }

    // Get authed user
    const user = await this.usersRepository.findOne({
      where: {
        id: payload.sub,
      },
      relations: ['role.permissions', 'info'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid access token user');
    }

    // Check password changed after token issued
    const passwordChangedAt = new Date(user.passwordChangedAt).getTime();
    const tokenIat = payload.iat * 1000;
    if (passwordChangedAt > tokenIat) {
      throw new UnauthorizedException(
        'Access token is invalid, user password has been changed',
      );
    }

    // Set authed user into request
    request['authInfo'] = new AuthInfo(user);
    this.cls.set('authInfo', request['authInfo']);

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
