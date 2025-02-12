import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../common/dto/pagination.dto';
import { BaseEntity } from '../common/base.entity';
import { SerializerService } from '@/src/serializer/serializer.service';
import { Resource } from './dto/resource.dto';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        const serialized = this.serializerService.serialize(data);
        return serialized;
      }),
    );
  }
}

@Injectable()
export class SerializeEntityInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: BaseEntity) => {
        const serialized = this.serializerService.serializeEntity(data);
        return serialized;
      }),
    );
  }
}

@Injectable()
export class SerializeEntityPageInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: Page<BaseEntity>) => {
        const serializedData = this.serializerService.serializeEntityArray(
          data.data,
        );

        const serializedPage = new Page<Resource>(serializedData, data.meta);

        return serializedPage;
      }),
    );
  }
}
