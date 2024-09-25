import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshInputDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
