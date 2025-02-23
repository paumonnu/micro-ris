import { Reflector } from '@nestjs/core';

export const Permissions = Reflector.createDecorator<string[]>();

export const CrudPermissions = Reflector.createDecorator<string>();
