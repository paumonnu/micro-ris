import { ErrorResponseDto } from '@/src/serializer/dto/response.dto';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = exception.message;
    if (exception instanceof EntityNotFoundError) {
      status = 404;
      message = 'Resource not found';
    }

    const responseObj = new ErrorResponseDto({ status, message });

    response.status(status).json(instanceToPlain(responseObj));
  }
}
