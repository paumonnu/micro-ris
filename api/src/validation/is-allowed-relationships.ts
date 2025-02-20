import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthService } from '../api/auth/auth.service';

interface AllowedRelationships {
  [relation: string]: string[];
}

export function IsRelationshipAllowed(
  relationships: AllowedRelationships,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [relationships],
      validator: IsRelationshipAllowedValidator,
    });
  };
}

@ValidatorConstraint({ name: 'isRelationshipAllowed', async: true })
@Injectable()
export class IsRelationshipAllowedValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly authService: AuthService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [relationships] = args?.constraints;
    const relationship = relationships[value];

    if (!relationship) {
      return false;
    }

    const userPermissions = this.authService.authInfo.permissions;

    const isAllowed = this.authService.hasPermissions(
      userPermissions,
      relationship,
    );

    return isAllowed;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const valiue = validationArguments.value;
    return `Relationship ${valiue} is not allowed.`;
  }
}
