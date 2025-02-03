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
import { Page } from '../core/dto/pagination.dto';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response.dto';
import { ResourceDto } from './dto/resource.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private includes: ResourceDto[] = [];

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

    if (data instanceof ResourceDto) {
      this.parseResourceRelationships(data);
    } else if (Array.isArray(data)) {
      data.map((item) => {
        this.parseResourceRelationships(item);
      });
    }

    const responseObj = new SuccessResponseDto({
      status,
      data: data instanceof Page ? data.data : data,
      includes: this.includes ? this.includes : undefined,
      pagination: data instanceof Page ? data.meta : undefined,
    });

    const responsePlain = instanceToPlain(responseObj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    return responsePlain;
  }

  private parseResourceRelationships(resource: ResourceDto) {
    if (!resource.relationships) {
      return;
    }

    Object.keys(resource.relationships).map((relKey) => {
      if (resource.relationships[relKey] instanceof ResourceDto) {
        resource.relationships[relKey] = this.parseResourceRelationship(
          resource.relationships[relKey],
        );
      } else {
        resource.relationships[relKey] = resource.relationships[relKey].map(
          (item) => {
            return this.parseResourceRelationship(item);
          },
        );
      }
    });
  }

  private parseResourceRelationship(resource: ResourceDto) {
    this.insertInclude(resource);
    this.parseResourceRelationships(resource);

    return {
      id: resource.id,
      type: resource.type,
    };
  }

  private insertInclude(resource: ResourceDto) {
    const found = this.includes.find(
      (item) => item.id === resource.id && item.type === resource.type,
    );

    if (!found) {
      this.includes.push(resource);
    }
  }
}
