import { IsEmail, IsNotEmpty } from 'class-validator';

export class RememberRegisterInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
