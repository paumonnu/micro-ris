import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { AuthService } from '../api/auth/auth.service';
import { ClsService } from 'nestjs-cls';

export function IsUserAllowed(
  permissions: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [permissions],
      validator: IsUserAllowedValidator,
    });
  };
}

@ValidatorConstraint({ name: 'isUserAllowed', async: true })
@Injectable()
export class IsUserAllowedValidator implements ValidatorConstraintInterface {
  constructor(private readonly authService: AuthService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [permissions] = args?.constraints;
    const userPermissions = this.authService.authInfo.permissions;

    const isAllowed = this.authService.hasPermissions(
      userPermissions,
      permissions,
    );

    return isAllowed;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property;
    return `You're not allowed to modify ${field}.`;
  }
}
