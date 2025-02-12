import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { compareHash } from '@/src/utils/auth';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto } from './dto/auth-token.dto';
import { ConfigService } from '@nestjs/config';
import { Permission } from '../permissions/entities/permission.entity';
import { AuthInfo } from './dto/auth-info.dto';
import { ClsService } from 'nestjs-cls';
import { MailService } from '@/src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cls: ClsService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  get authInfo(): AuthInfo {
    return this.cls.get('authInfo');
  }

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

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async hasPermissions(
    userPermissions: Permission[],
    checkPermissions: string[],
  ): Promise<boolean> {
    const found = checkPermissions.find((permission) => {
      return !userPermissions.find(
        (userPermission) => permission === userPermission.name,
      );
    });

    return !found;
  }

  async registerUser(email: string, password: string): Promise<User> {
    const emailExists = await this.userRepository.exists({
      where: { email: email },
    });
    if (emailExists) {
      throw new UnprocessableEntityException('Email is already being used.');
    }

    const user = new User();
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);

    await this.sendConfirmationEmail(user);

    return user;
  }

  async rememberRegister(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email, verifiedAt: IsNull() },
    });

    if (!user) {
      return;
    }

    await this.sendConfirmationEmail(user);
  }

  async rememberPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email, verifiedAt: Not(IsNull()) },
    });

    if (!user) {
      return;
    }

    await this.sendRememberPasswordEmail(user);
  }

  async resetPassword(resetToken: string, password: string) {
    const payload = await this.jwtService.verifyAsync(resetToken);

    const user = await this.userRepository.findOneBy({
      id: payload.sub,
    });

    const passwordChangedAt = new Date(user.passwordChangedAt).getTime();
    const tokenIat = payload.iat * 1000;
    console.log(passwordChangedAt, tokenIat);

    if (passwordChangedAt && passwordChangedAt > tokenIat) {
      throw new UnauthorizedException('Reset password token is invalid');
    }

    user.password = password;

    await this.userRepository.save(user);
  }

  async confirmRegistration(confirmationToken: string) {
    const payload = await this.jwtService.verifyAsync(confirmationToken);

    const user = await this.userRepository.findOneBy({
      id: payload.sub,
    });

    user.verifiedAt = new Date();

    await this.userRepository.save(user);
  }

  private async sendConfirmationEmail(user: User) {
    const registrationToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '2d',
      },
    );

    const confirmUrl =
      this.configService.get('app.baseUrl') +
      '/api/auth/register/confirm?confirmToken=' +
      registrationToken;

    const mailInfo = await this.mailService.sendMail({
      from: '"Application Name" <admin@app.com>',
      to: user.email,
      subject: 'Register confirmation',
      html:
        'Please, click the following link to confirm your registration: <a href="' +
        confirmUrl +
        '">Confirm account</a>',
    });
  }

  private async sendRememberPasswordEmail(user: User) {
    const rememberPasswordToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '1h',
      },
    );

    const rememberUrl =
      this.configService.get('app.baseUrl') +
      '/api/auth/remember/password?rememberToken=' +
      rememberPasswordToken;

    const mailInfo = await this.mailService.sendMail({
      from: '"Application Name" <admin@app.com>',
      to: user.email,
      subject: 'Password reset',
      html:
        'Please, click the following link to reset your password: <a href="' +
        rememberUrl +
        '">Reset password</a>',
    });
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
