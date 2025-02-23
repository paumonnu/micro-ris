import { ErrorResponseDto } from '@/src/serializer/dto/response.dto';
import { ValidationException } from '@/src/validation/validation.exception';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = exception.message;
    let errors = null;
    if (exception instanceof NotFoundException) {
      message = 'Route not found';
    } else if (exception instanceof ValidationException) {
      errors = exception.errors;
    }

    const responseObj = new ErrorResponseDto({
      status,
      message,
      errors,
    });

    response.status(status).json(instanceToPlain(responseObj));
  }
}
