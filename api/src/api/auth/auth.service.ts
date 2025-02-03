import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { compareHash } from '@/src/core/utils/auth';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto } from './dto/auth-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<AuthTokenDto> {
    const user: User = await this.validateUser(email, password);

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return new AuthTokenDto({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthTokenDto> {
    let refreshPayload;
    try {
      refreshPayload = (await this.validateToken(refreshToken)) as any;
    } catch (err) {
      throw new UnauthorizedException('Refresh token not valid.');
    }

    let user;
    try {
      user = await this.userRepository.findOneBy({
        id: refreshPayload.sub,
      });
    } catch (err) {
      throw new UnauthorizedException('Refresh token not valid.');
    }

    const accessToken = await this.generateAccessToken(user);

    return new AuthTokenDto({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    // Check user exists
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check password
    const correctPassword = await compareHash(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException('Email and/or password are incorrect');
    }

    return user;
  }

  async validateToken(token: string): Promise<object> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    return await this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('auth.jwtRefreshExpiresIn'),
    });
  }
}
