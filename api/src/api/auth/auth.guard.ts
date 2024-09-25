import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'No Bearer access token found in Authorization header',
      );
    }

    let user: User;
    let payload;

    try {
      payload = (await this.authService.validateToken(token)) as any;
      user = await this.usersRepository.findOneByOrFail({
        id: payload.sub,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }

    const passwordChangedAt = new Date(user.passwordChangedAt).getTime();
    const tokenIat = payload.iat * 1000;

    if (passwordChangedAt > tokenIat) {
      throw new UnauthorizedException(
        'Access token is invalid, user password has been changed',
      );
    }

    request['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
