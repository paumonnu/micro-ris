import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';
import { ResourceDto } from './dto/resource.dto';
import { isEmpty } from 'class-validator';
import { PageDto } from './dto/pagination.dto';
import { BaseEntity } from '../entities/base.entity';
import { Page } from '../dto/pagination.dto';

@Injectable()
export class SerializerService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  public serialize(data: any) {
    if (data instanceof BaseEntity) {
      const transformedEntity = plainToInstance(data.constructor as any, data, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }) as any;

      return this.serializeEntity(transformedEntity);
    } else if (data instanceof Page) {
      return this.serializePagination(data);
    } else {
      return instanceToPlain(data);
    }
  }

  public serializeEntity(entity: BaseEntity) {
    // Class transform the entity
    const transformedEntity = plainToInstance(
      entity.constructor as any,
      entity,
      { excludeExtraneousValues: true, exposeUnsetFields: false },
    ) as any;

    // Destructure entity
    const { id, type, ...attributes } = transformedEntity;

    // Get entity repository
    const entityRepository = this.entityManager.getRepository(
      entity.constructor.name,
    );

    // Get entity relationship name list
    const relationKeys = entityRepository.metadata.relations
      .filter((relation) => relation.isManyToOne)
      .map((relation) => relation.propertyName);

    // Get attributes
    const cleanAttributes = Object.keys(attributes).reduce((acc, key) => {
      if (relationKeys.includes(key)) {
        return acc;
      }
      return { ...acc, [key]: attributes[key] };
    }, {});

    // Get relationships
    const relationships = Object.keys(attributes).reduce((acc, key) => {
      if (!relationKeys.includes(key)) {
        return acc;
      }

      const relationship = attributes[key];
      let transformedRelationship;

      if (Array.isArray(relationship)) {
        transformedRelationship = relationship.map((relElem) => {
          if (relElem instanceof BaseEntity) {
            return this.serialize(relElem);
          }

          return relElem;
        });
      } else if (relationship instanceof BaseEntity) {
        transformedRelationship = this.serialize(relationship);
      } else {
        transformedRelationship = relationship;
      }

      return { ...acc, [key]: transformedRelationship };
    }, {});

    return new ResourceDto({
      id: entity.id,
      type: entity.type,
      attributes: cleanAttributes,
      relationships: !Object.keys(relationships).length
        ? undefined
        : relationships,
    });
  }

  public serializePagination(page: Page<any>) {
    const serializedData = page.data.map((item) => this.serialize(item));
    return new PageDto({ data: serializedData, meta: page.meta });
  }

  public serializeResponse() {}
}
