import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordValidator,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidPassword' })
@Injectable()
export class IsValidPasswordValidator implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: string, args?: ValidationArguments): Promise<boolean> {
    const regex = new RegExp(
      '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$',
      // '^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
    );

    return regex.test(value);
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property;

    return `${field} must be between 8 and 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&).`;
  }
}
