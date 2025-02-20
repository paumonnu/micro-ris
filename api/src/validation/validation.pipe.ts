import {
  Injectable,
  ValidationPipe as NestValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './validation.exception';

function exceptionFactory(errors: ValidationError[]) {
  const errorMessage = errors.reduce((acc, cur) => {
    const constraintsErrors = Object.keys(cur.constraints).map((errorKey) => ({
      field: cur.property,
      type: errorKey,
      message: cur.constraints[errorKey],
    }));

    return [...acc, ...constraintsErrors];
  }, []);

  return new ValidationException(errorMessage);
}

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor(options: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: exceptionFactory,
    });
  }
}
