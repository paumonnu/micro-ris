import { ErrorResponseDto } from '@/src/serializer/dto/response.dto';
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 500;
    const message = exception.message;

    const responseObj = new ErrorResponseDto({ status, message });

    console.error(exception);

    response.status(status).json(instanceToPlain(responseObj));
  }
}
