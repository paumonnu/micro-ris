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
  @Transform(({ value, key, obj, type }) => {
    const relationships = obj.relationships;

    Object.keys(relationships).map((relKey) => {
      relationships[relKey] = relationships[relKey];

      if (Array.isArray(relationships[relKey])) {
        return relationships[relKey].map((relation) => {
          includes.push(relation);
        });
      }

      includes.push(relationships[relKey]);
    });

    return includes;
  })
  relationships?: object;
}
