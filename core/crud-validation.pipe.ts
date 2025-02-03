import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
  Type,
} from "@nestjs/common";
import { ValidationError } from "class-validator";

export interface CrudValidationPipeOptions extends ValidationPipeOptions {
  body?: Type;
  query?: Type;
  param?: Type;
}

function exceptionFactory(errors: ValidationError[]) {
  const errorMessage = errors.reduce((acc, cur) => {
    acc[cur.property] = cur.constraints;
    return acc;
  }, {} as any);

  return new BadRequestException(errorMessage);
}

@Injectable()
export class CrudValidationPipe extends ValidationPipe {
  body: Type;
  query: Type;
  param: Type;

  constructor(options: CrudValidationPipeOptions) {
    const { body, query, param, ...validationOptions } = options;
    super({
      ...validationOptions,
      stopAtFirstError: false,
      exceptionFactory: exceptionFactory,
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

    return super.transform(value, { ...metadata, metatype: targetType });
  }
}
