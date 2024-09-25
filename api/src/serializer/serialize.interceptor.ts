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
import { Page } from '../common/dto/pagination.dto';
import { BaseEntity } from '../common/entities/base.entity';
import { serialize } from 'v8';
import { User } from '@/src/api/users/entities/user.entity';
import { serializeEntity } from '../common/utils/serialization';
import { dataSource } from '@/src/config/typeorm-datasource.config';
import { SerializerService } from '@/src/serializer/serializer.service';

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
        return this.serializerService.serialize(data);
      }),
    );
  }
}
