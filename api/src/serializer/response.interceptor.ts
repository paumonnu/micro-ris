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

    const responseObj = new ErrorResponseDto({
      status,
      message: exception.message,
      // errors: (exception.getResponse() as any).message,
    });

    response.status(status).json(
      instanceToPlain(responseObj, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }),
    );

    return exception;
  }

  responseHandler(data: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = response.statusCode;

    const responseObj = new SuccessResponseDto({
      status,
      data: data instanceof Page ? data.data : data,
      pagination: data instanceof Page ? data.meta : undefined,
    });

    const responsePlain = instanceToPlain(responseObj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    return responsePlain;
  }
}
