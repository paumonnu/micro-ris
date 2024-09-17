import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
// import { ErrorResponseDto } from '../dto/response.dto';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response
//       .status(status)
//       .json(new ErrorResponseDto(status, exception.message));
//   }
// }

// @Catch(TypeORMError)
// export class TypeOrmExceptionFilter implements ExceptionFilter {
//   catch(exception: TypeORMError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let status = 500;
//     let message = exception.message;
//     if (exception instanceof EntityNotFoundError) {
//       status = 404;
//       message = 'Resource not found';
//     }

//     response.status(status).json(new ErrorResponseDto(status, message));
//   }
// }
