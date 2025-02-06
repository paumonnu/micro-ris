import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
import { Page } from '../common/dto/pagination.dto';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response.dto';
import { Resource } from './dto/resource.dto';
import { SerializerService } from './serializer.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private serializerService: SerializerService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = response.statusCode;

        let includes = [];
        if (data instanceof Resource) {
          includes = this.serializerService.extractIncludes(data);
        } else if (data instanceof Page) {
          includes = this.serializerService.extractIncludes(data.data);
        }

        const responseObj = new SuccessResponseDto({
          status,
          data: data instanceof Page ? data.data : data,
          pagination: data instanceof Page ? data.meta : undefined,
          includes: includes.length ? includes : undefined,
        });

        const responsePlain = instanceToPlain(responseObj, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        });

        return responsePlain;
      }),
    );
  }
}
