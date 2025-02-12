import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { LoginInputDto } from './dto/login-input.dto';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RefreshInputDto } from './dto/refresh-input.dto';
import { User } from '../users/entities/user.entity';
import { SerializeEntityInterceptor } from '@/src/serializer/serialize.interceptor';
import { AuthToken } from './auth-token.decorator';
import { CurrentUser } from './auth-info.decorator';
import { RegisterInputDto } from './dto/register-input.dto';
import { ValidationPipe } from '@/src/validation/validation.pipe';
import { RegisterConfirmInputDto } from './dto/register-confirm-input.dto';
import { RememberRegisterInputDto } from './dto/remember-register-input.dto';
import { RememberPasswordInputDto } from './dto/remember-password-input.dto';
import { ResetPasswordInputDto } from './dto/reset-password-input.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/auth/login')
  async login(@Body() body: LoginInputDto): Promise<AuthTokenDto> {
    return await this.authService.login(body.email, body.password);
  }

  @Post('api/auth/refresh')
  async refresh(@Body() body: RefreshInputDto): Promise<AuthTokenDto> {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @Post('api/auth/register')
  async register(@Body() body: RegisterInputDto) {
    await this.authService.registerUser(body.email, body.password);
  }

  @Get('api/auth/register/confirm')
  async registerConfirm(@Query() query: RegisterConfirmInputDto) {
    await this.authService.confirmRegistration(query.confirmToken);
  }

  @Post('api/auth/register/remember')
  async rememberRegister(@Body() body: RememberRegisterInputDto) {
    await this.authService.rememberRegister(body.email);
  }

  @Post('api/auth/password/remember')
  async rememberPassword(@Body() body: RememberPasswordInputDto) {
    await this.authService.rememberPassword(body.email);
  }

  @Post('api/auth/password/reset')
  async resetPassword(@Body() body: ResetPasswordInputDto) {
    await this.authService.resetPassword(body.token, body.password);
  }

  @Get('api/auth/me')
  @AuthToken()
  @UseInterceptors(SerializeEntityInterceptor)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
