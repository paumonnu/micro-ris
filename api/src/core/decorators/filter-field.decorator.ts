import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFilterField(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFilterField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...{
          message: 'Parameter is not a field query object',
        },
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return false;
        },
      },
    });
  };
}
