import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { BaseEntityDto } from '../../common/dto/entity.dto';
import { DataSource } from 'typeorm';
import { getRepository } from 'typeorm';
import { BaseEntity } from '@/src/common/entities/base.entity';

export interface ResourceRelationship {
  id: string;
  type: string;
}

export interface ResourceRelationships {
  [relationshipName: string]: ResourceRelationship | ResourceRelationship[];
}

export class Resource {
  constructor({ id, type, attributes = {}, relationships = undefined }) {
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
    if (!value) {
      return undefined;
    }

    const returnVal = {};
    Object.keys(value).map((relName) => {
      if (Array.isArray(value[relName])) {
        returnVal[relName] = value[relName].map((elem) => ({
          id: elem.id,
          type: elem.type,
        }));
      } else {
        returnVal[relName] = {
          id: value[relName].id,
          type: value[relName].type,
        };
      }
    });

    return returnVal;
  })
  relationships?: Resource | Resource[];
}
