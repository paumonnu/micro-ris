import { IsValidPassword } from '@/src/validation/is-password';
import { Match } from '@/src/validation/match';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class ResetPasswordInputDto {
  @IsJWT()
  @IsNotEmpty()
  token: string;

  @IsValidPassword()
  @IsNotEmpty()
  password: string;

  @IsValidPassword()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;
}
