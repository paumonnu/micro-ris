import { ErrorResponseDto } from '@/src/core/serializer/dto/response.dto';
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
    } else if (exception instanceof BadRequestException) {
      errors = exception.getResponse();
    }

    const responseObj = new ErrorResponseDto({
      status,
      message,
      errors,
    });

    response.status(status).json(instanceToPlain(responseObj));
  }
}
