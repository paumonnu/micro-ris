import { Injectable } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

export function IsUnique(
  entityClass: ClassConstructor<BaseEntity>,
  uniqueField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass, uniqueField],
      validator: IsUniqueValidator,
    });
  };
}

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [entityClass, uniqueField] = args?.constraints as string[];
    const dataExist = await this.entityManager
      .getRepository(entityClass)
      .exists({ where: { [uniqueField]: value } });

    return !dataExist;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property;
    return `${field} must be unique.`;
  }
}
