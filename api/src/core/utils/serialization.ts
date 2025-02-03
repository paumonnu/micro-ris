import { plainToInstance } from 'class-transformer';
import { ResourceDto } from '../../serializer/dto/resource.dto';

export function serializeEntity(dto, entity) {
  const instance = plainToInstance(dto, entity, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  }) as any;

  return new ResourceDto(instance);
}
