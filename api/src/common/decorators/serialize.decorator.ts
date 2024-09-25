import { UseInterceptors } from '@nestjs/common';
import { ClassContructor } from '../../serializer/serialize.interceptor';

// export function Serialize(dto: ClassContructor) {
//   return UseInterceptors(new SerializeInterceptor(dto));
// }

export function Serialize() {
  // return UseInterceptors(new SerializeInterceptor());
}

export function SerializeResource(dto: ClassContructor) {
  // return UseInterceptors(new SerializeResourceInterceptor(dto));
}

export function SerializeResourcePage(dto: ClassContructor) {}
