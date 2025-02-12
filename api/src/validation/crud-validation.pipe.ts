import {
  Injectable,
  ArgumentMetadata,
  ValidationPipeOptions,
  Type,
} from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

export interface CrudValidationPipeOptions extends ValidationPipeOptions {
  body?: Type;
  query?: Type;
  param?: Type;
}

@Injectable()
export class CrudValidationPipe extends ValidationPipe {
  body: Type;
  query: Type;
  param: Type;

  constructor(options: CrudValidationPipeOptions) {
    const { body, query, param, ...validatorOptions } = options;

    super({
      ...validatorOptions,
    });

    this.body = body;
    this.query = query;
    this.param = param;
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this[metadata.type];

    if (!targetType) {
      return super.transform(value, metadata);
    }

    return super.transform(value, {
      ...metadata,
      metatype: targetType,
    });
  }
}
