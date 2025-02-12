import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterConfirmInputDto {
  @IsString()
  @IsNotEmpty()
  confirmToken: string;
}
