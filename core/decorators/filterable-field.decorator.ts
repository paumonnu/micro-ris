import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';
import { validQueryOperators } from '../utils/query';

@ValidatorConstraint()
export class IsValidFilterableOperatorConstraint
  implements ValidatorConstraintInterface
{
  private getInvalidOperators(value) {
    const intersect = Object.keys(value).filter(
      (x) => !Object.keys(validQueryOperators).includes(x),
    );

    return intersect;
  }

  validate(value: any, args: ValidationArguments) {
    if (typeof value === 'object' && value !== null) {
      const invalidOperators = this.getInvalidOperators(value);
      if (invalidOperators.length) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args?: ValidationArguments) {
    if (typeof args.value === 'object' && args.value !== null) {
      const invalidOperators = this.getInvalidOperators(args.value);
      if (invalidOperators.length) {
        return `${args.property} operators "${invalidOperators.join(', ')}" are not correct operators (${Object.keys(validQueryOperators).join(', ')})`;
      }
    }

    return `${args.property} is not correct`;
  }
}

export function IsFilterableField(
  // property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFilterableField',
      target: object.constructor,
      constraints: [],
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidFilterableOperatorConstraint,
    });
  };
}
