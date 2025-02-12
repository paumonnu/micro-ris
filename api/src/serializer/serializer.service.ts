import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Resource } from './dto/resource.dto';

@Injectable()
export class SerializerService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  public serialize(data: any) {
    return instanceToPlain(data);
  }

  public serializeEntity(entity: BaseEntity): Resource {
    // Class transform the entity
    const transformedEntity = plainToInstance(
      entity.constructor as any,
      entity,
      { excludeExtraneousValues: true, exposeUnsetFields: false },
    ) as any;

    // Destructure entity
    const { id, type, ...rawAttributes } = transformedEntity;

    // Get entity repository
    const entityRepository = this.entityManager.getRepository(
      entity.constructor.name,
    );

    // Get entity relationship name list
    const relationKeys = entityRepository.metadata.relations.map(
      (relation) => relation.propertyName,
    );

    // Get attributes
    const cleanAttributes = Object.keys(rawAttributes).reduce((acc, key) => {
      if (relationKeys.includes(key)) {
        return acc;
      }
      return { ...acc, [key]: rawAttributes[key] };
    }, {});

    // Serialize relationships
    const relationships = Object.keys(rawAttributes).reduce((acc, key) => {
      if (!relationKeys.includes(key)) {
        return acc;
      }

      const relationship = rawAttributes[key];
      let serializedRelationship;
      if (Array.isArray(relationship)) {
        serializedRelationship = relationship.map((entity) => {
          const serializedResource = this.serializeEntity(entity);
          return serializedResource;
        });
      } else if (relationship instanceof BaseEntity) {
        serializedRelationship = this.serializeEntity(relationship);
      } else {
        return acc;
      }

      return { ...acc, [key]: serializedRelationship };
    }, {});

    const resource = new Resource({
      id: id,
      type: type,
      attributes: cleanAttributes,
      relationships: !Object.keys(relationships).length
        ? undefined
        : relationships,
    });

    return resource;
  }

  public serializeEntityArray(entities: BaseEntity[]): Resource[] {
    const resources = entities.map((entity) => {
      return this.serializeEntity(entity);
    });

    return resources;
  }

  public extractIncludes(data: Resource | Resource[]): Resource[] {
    const includes = [];
    const dataArr = !Array.isArray(data) ? [data] : data;

    dataArr.map((resource) => {
      if (!resource.relationships) {
        return;
      }

      Object.keys(resource.relationships).map((relName) => {
        // Transform relationship to array
        const relArr = !Array.isArray(resource.relationships[relName])
          ? [resource.relationships[relName]]
          : resource.relationships[relName];

        // Map relationship and recursively get includes from it
        relArr.map((relResource) => {
          const relIncludes = this.extractIncludes(relResource);

          relIncludes.map((relIncludesResource) => {
            this.insertResourceIfNotExists(includes, relIncludesResource);
          });

          this.insertResourceIfNotExists(includes, relResource);
        });
      });
    });

    return includes;
  }

  private insertResourceIfNotExists(insertArr: Resource[], resource: Resource) {
    const found = insertArr.find(
      (elem) => elem.id === resource.id && elem.type === resource.type,
    );

    if (!found) {
      insertArr.push(resource);
    }
  }
}
