import { BadRequestException, HttpStatus } from '@nestjs/common';

interface ValidationConstraintError {
  field: string;
  type: string;
  message: string;
}

export class ValidationException extends BadRequestException {
  constructor(readonly errors: ValidationConstraintError[]) {
    super();
  }
}
