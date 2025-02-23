import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { LoginInputDto } from './dto/login-input.dto';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RefreshInputDto } from './dto/refresh-input.dto';
import { User } from '../users/entities/user.entity';
import { AuthToken } from './auth-token.decorator';
import { CurrentUser } from './auth-info.decorator';
import { RegisterInputDto } from './dto/register-input.dto';
import { RegisterConfirmInputDto } from './dto/register-confirm-input.dto';
import { RememberRegisterInputDto } from './dto/remember-register-input.dto';
import { RememberPasswordInputDto } from './dto/remember-password-input.dto';
import { ResetPasswordInputDto } from './dto/reset-password-input.dto';
import { SerializeEntityInterceptor } from '@/src/serializer/serialize.interceptor';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body: LoginInputDto): Promise<AuthTokenDto> {
    return await this.authService.login(body.email, body.password);
  }

  @Post('auth/refresh')
  async refresh(@Body() body: RefreshInputDto): Promise<AuthTokenDto> {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @Post('auth/register')
  async register(@Body() body: RegisterInputDto) {
    await this.authService.registerUser(body.email, body.password);
  }

  @Get('auth/register/confirm')
  async registerConfirm(@Query() query: RegisterConfirmInputDto) {
    await this.authService.confirmRegistration(query.confirmToken);
  }

  @Post('auth/register/remember')
  async rememberRegister(@Body() body: RememberRegisterInputDto) {
    await this.authService.rememberRegister(body.email);
  }

  @Post('auth/password/remember')
  async rememberPassword(@Body() body: RememberPasswordInputDto) {
    await this.authService.rememberPassword(body.email);
  }

  @Post('auth/password/reset')
  async resetPassword(@Body() body: ResetPasswordInputDto) {
    await this.authService.resetPassword(body.token, body.password);
  }

  @Get('auth/me')
  @AuthToken()
  @UseInterceptors(SerializeEntityInterceptor)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
