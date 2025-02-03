import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  classToPlain,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { Page } from '../core/dto/pagination.dto';
import { BaseEntity } from '../core/entities/base.entity';
import { serialize } from 'v8';
import { User } from '@/src/api/users/entities/user.entity';
import { serializeEntity } from '../core/utils/serialization';
import { dataSource } from '@/src/config/typeorm-datasource.config';

export interface ClassContructor {
  new (...args: any[]): object;
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: ClassContructor) => {
        const serialized = this.serializerService.serialize(data);
        console.log(serialized);
        return serialized;
      }),
    );
  }
}
