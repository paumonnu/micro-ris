import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../shared/dto/pagination.dto';
import { BaseEntity } from '../shared/base.entity';
import { SerializerService } from '@/src/serializer/serializer.service';
import { Resource, ResourceData } from './dto/resource.dto';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class SerializeEntityInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        return this.serializerService.serializeEntity(data);
      }),
    );
  }
}

@Injectable()
export class SerializePageInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        const serializedData = this.serializerService.serializeEntityArray(
          data.data,
        );

        return new ResourceData({
          data: serializedData.data,
          includes: serializedData.includes,
          pagination: {
            count: data.count,
            total: data.total,
            page: data.page,
            pageCount: data.pageCount,
          },
        });
      }),
    );
  }
}
