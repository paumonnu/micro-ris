import { ValidationError } from '@nestjs/common';
import { ValidationException } from './validation.exception';

export function exceptionFactory(errors: ValidationError[]) {
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
