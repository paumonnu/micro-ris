import { Expose, Transform, Type } from 'class-transformer';
import { BaseEntityDto } from '../../common/dto/entity.dto';
import { DataSource } from 'typeorm';
import { getRepository } from 'typeorm';

export class ResourceDto {
  constructor({ id, type, attributes, relationships }) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.relationships = relationships;
  }

  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  attributes: object;

  @Expose()
  relationships?: object;
}
