import { Expose, Transform } from 'class-transformer';
import { IsArray } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';

export class ResourceDto<T extends BaseEntity> {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  @Transform(
    ({ value, key, obj, type }) => {
      const { id, type: resourceType, ...attributes } = obj;
      return attributes;
    },
    { toClassOnly: true },
  )
  attributes: Omit<T, 'id' | 'type'>;
}
