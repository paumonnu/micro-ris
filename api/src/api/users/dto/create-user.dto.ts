import { IsUnique } from '@/src/validation/is-unique';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsUnique(User, 'email')
  email: string;

  @IsString()
  password: string;
}
