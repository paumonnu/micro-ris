import { IsEmail, IsNotEmpty } from 'class-validator';

export class RememberPasswordInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
