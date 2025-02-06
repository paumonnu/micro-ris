import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
