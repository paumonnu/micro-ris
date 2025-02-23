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
import { Page } from '../shared/dto/pagination.dto';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response.dto';
import { Resource, ResourceData } from './dto/resource.dto';
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

        let responseData = data;
        let responseIncludes;
        let responsePagination;

        if (data instanceof ResourceData) {
          responseData = data.data;
          responseIncludes = data.includes;
          responsePagination = data.pagination;
        }

        const responseObj = new SuccessResponseDto({
          status,
          data: responseData,
          includes: responseIncludes,
          pagination: responsePagination,
        });

        const responsePlain = instanceToPlain(responseObj, {
          excludeExtraneousValues: true,
          // exposeUnsetFields: false,
        });

        return responsePlain;
      }),
    );
  }
}
