import { IsValidPassword } from '@/src/validation/is-password';
import { IsUnique } from '@/src/validation/is-unique';
import { Match } from '@/src/validation/match';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class RegisterInputDto {
  @IsEmail()
  @IsUnique(User, 'email')
  @IsNotEmpty()
  email: string;

  @IsValidPassword()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}
