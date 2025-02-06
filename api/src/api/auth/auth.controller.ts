import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { LoginInputDto } from './dto/login-input.dto';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RefreshInputDto } from './dto/refresh-input.dto';
import { User } from '../users/entities/user.entity';
import { SerializeEntityInterceptor } from '@/src/serializer/serialize.interceptor';
import { Secured } from './secured.decorator';
import { CurrentUser } from './current-user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginInputDto): Promise<AuthTokenDto> {
    return await this.service.login(body.email, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshInputDto): Promise<AuthTokenDto> {
    return await this.service.refreshToken(body.refreshToken);
  }

  @Get('me')
  @Secured()
  @UseInterceptors(SerializeEntityInterceptor)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
