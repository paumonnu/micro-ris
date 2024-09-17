import { UseInterceptors } from '@nestjs/common';
import {
  ClassContructor,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
