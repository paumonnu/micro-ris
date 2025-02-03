import { IsUUID } from 'class-validator';

export class ResourceByIdDto {
  @IsUUID()
  id: string;
}
