import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsUnique } from '@/src/validation/is-unique';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @IsUnique(User, 'email')
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
