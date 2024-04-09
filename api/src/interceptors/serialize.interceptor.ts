import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { PaginatedResponseDto } from 'src/resources/base/dto/paginated-response.dto';

export interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// export function SerializePagination(dto: ClassConstructor) {
//   return plainToClassFromExist(new PaginatedResponseDto<User>(User));
// }

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('Im runing before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // console.log('Im running before response is sent out', data);

        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
