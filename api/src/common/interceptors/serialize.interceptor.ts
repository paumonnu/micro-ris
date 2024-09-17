import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { Page } from '../dto/pagination.dto';
import { BaseEntity } from '../entities/base.entity';
import { ResourceDto } from '../dto/resource.dto';
import { PageDto } from '../dto/serialize.dto';
import { serialize } from 'v8';

export interface ClassContructor {
  new (...args: any[]): object;
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: ClassContructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        });
      }),
    );
  }
}

export class SerializeResourceInterceptor implements NestInterceptor {
  // constructor(private dto: ClassContructor) {}
  constructor() {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: ClassContructor) => {
        if (data instanceof PageDto) {
          data.data = plainToInstance(ResourceDto, data.data, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
          });

          return data;
        }

        return plainToInstance(ResourceDto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        });
      }),
    );
  }
}
