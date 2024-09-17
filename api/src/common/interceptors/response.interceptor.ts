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
import { format } from 'date-fns';
import { PageDto } from '../dto/serialize.dto';
import { PaginationMeta } from '../dto/pagination.dto';
import { ErrorResponseDto, ResourceResponseDto } from '../dto/response.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export type Response = {
  status: number;
  message?: string;
  pagination?: PaginationMeta;
  data: object | [];
  timestamp: string;
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // const responseObj = new ErrorResponseDto();
    // // responseObj.data = data instanceof PageDto ? data.data : data;
    // // responseObj.pagination = data instanceof PageDto ? data.meta : undefined;
    // // responseObj.status = status;

    // return instanceToPlain(responseObj, {
    //   excludeExtraneousValues: true,
    //   exposeUnsetFields: false,
    // });

    const responseObj = new ErrorResponseDto({
      status,
      message: exception.message,
      errors: exception.stack,
    });

    return instanceToPlain(responseObj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  responseHandler(data: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = response.statusCode;

    const responseObj = new ResourceResponseDto({
      status,
      data: data instanceof PageDto ? data.data : data,
      pagination: data instanceof PageDto ? data.meta : undefined,
    });

    return instanceToPlain(responseObj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
