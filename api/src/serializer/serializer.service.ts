import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Resource, ResourceData } from './dto/resource.dto';

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

  public serializeEntity(entity: BaseEntity): ResourceData {
    if (!entity) {
      return null;
    }

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
    const includes = [];
    const relationships = Object.keys(rawAttributes).reduce((acc, key) => {
      if (!relationKeys.includes(key)) {
        return acc;
      }

      const relationship = rawAttributes[key];
      let serializedRelationship;
      if (Array.isArray(relationship)) {
        serializedRelationship = relationship.map((entity: BaseEntity) => {
          const serializedData = this.serializeEntity(entity);

          this.insertResourceIfNotExists(includes, [
            serializedData.data as any,
            ...serializedData.includes,
          ]);

          return { id: entity.id, type: entity.type };
        });
      } else if (relationship instanceof BaseEntity) {
        serializedRelationship = {
          id: relationship.id,
          type: relationship.type,
        };

        const serializedData = this.serializeEntity(relationship);

        this.insertResourceIfNotExists(includes, [
          serializedData.data as any,
          ...serializedData.includes,
        ]);
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

    const resourceData = new ResourceData({
      data: resource,
      // includes: includes.length ? includes : undefined,
      includes: includes,
    });

    return resourceData;
  }

  public serializeEntityArray(entities: BaseEntity[]): ResourceData {
    const includes = [];
    const data = entities.map((entity) => {
      const serializedData = this.serializeEntity(entity);
      this.insertResourceIfNotExists(includes, serializedData.includes);
      return serializedData.data;
    });

    return new ResourceData({ data, includes });
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

  private insertResourceIfNotExists(
    insertArr: Resource[],
    resource: Resource | Resource[],
  ) {
    const resourceArr = Array.isArray(resource) ? resource : [resource];

    resourceArr.map((res) => {
      const found = insertArr.find(
        (elem) => elem.id === res.id && elem.type === res.type,
      );

      if (!found) {
        insertArr.push(res);
      }
    });
  }
}
