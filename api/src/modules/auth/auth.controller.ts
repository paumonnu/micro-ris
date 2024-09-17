import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compareHash } from '@/src/common/utils/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.service.generateNewUserToken(body.email, body.password);
  }
}
