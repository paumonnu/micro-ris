import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginInputDto } from './dto/login-input.dto';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RefreshInputDto } from './dto/refresh-input.dto';
import { AuthGuard } from './auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './auth-info.decorator';

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
  @UseGuards(AuthGuard)
  // @SerializeResource()
  async me(@CurrentUser() user: User) {
    return user;
  }
}
