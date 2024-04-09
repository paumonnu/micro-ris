import { Exclude, Expose, Type } from 'class-transformer';

export class PaginatedResponseDto<T> {
  @Exclude()
  private type: Function;

  @Expose()
  @Type((opt) => (opt.newObject as PaginatedResponseDto<T>).type)
  data: T[];

  constructor(type: Function) {
    this.type = type;
  }
}
