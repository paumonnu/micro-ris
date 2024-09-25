import { Expose } from 'class-transformer';

export class BaseEntityDto {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
