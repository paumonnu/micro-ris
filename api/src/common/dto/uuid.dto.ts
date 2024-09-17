import { IsUUID } from 'class-validator';

export class GetResourceByIdDto {
  @IsUUID()
  id: string;
}
