import { BaseEntity } from 'typeorm';

export class CrudControllerOptions<T extends BaseEntity> {
  name: string;
  entity: T;
  actions: string[] = [];

  createDto: object;
  updateDto: object;
  queryDto: object;
}
