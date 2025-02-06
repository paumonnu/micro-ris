import { Type } from '@nestjs/common';
import { BaseEntity } from './entities/base.entity';
import { Between, DeepPartial, In, QueryBuilder, Repository } from 'typeorm';
import { validate } from 'uuid';
import { QueryManyDto, QueryOneDto } from './dto/query.dto';
import {
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  LessThan,
  MoreThan,
  Not,
  Like,
  And,
} from 'typeorm';
import { Page, PaginationMeta } from './dto/pagination.dto';
import { queryManyBuilder, queryOneBuilder } from './utils/query';

export interface ICrudService<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryManyDto,
> {
  create(createDto: CreateDto): Promise<EntityType>;
  get(queryDto: QueryManyDto): Promise<Page<EntityType>>;
  getOne(id: string, queryDto: QueryOneDto): Promise<EntityType>;
  update(id: string, updateDto: UpdateDto): Promise<EntityType>;
  delete(id: string): Promise<EntityType>;
}

export function CrudServiceFactory<
  T extends BaseEntity,
  C,
  U,
  Q extends QueryManyDto,
>(): Type<ICrudService<T, C, U, Q>> {
  class CrudService<T extends BaseEntity, C, U, Q extends QueryManyDto>
    implements ICrudService<T, C, U, Q>
  {
    protected repository: Repository<T>;

    async create(createDto: C): Promise<T> {
      const item = this.repository.create(createDto as DeepPartial<T>);

      const createResult = await this.repository.save(item);

      return await this.repository.findOneOrFail({
        where: { id: createResult.id as any },
      });
    }

    async get(queryDto: Q): Promise<Page<T>> {
      const queryOptions = queryManyBuilder(queryDto);

      const [result, total] = await this.repository.findAndCount(queryOptions);

      const pageResult = new Page<T>(result, {
        page: queryDto.page,
        limit: queryDto.limit,
        count: total,
      });

      return pageResult;
    }

    async getOne(id: any, queryDto: QueryOneDto): Promise<T> {
      const queryOptions = queryOneBuilder(id, queryDto);

      const entity = await this.repository.findOneOrFail(queryOptions);

      return entity;
    }

    async update(id: any, updateDto: U): Promise<T> {
      const entity = await this.repository.findOneOrFail({ where: { id } });

      const updateResult = await this.repository.save(
        Object.assign(entity, updateDto),
      );

      return updateResult;

      // const updatedEntity = await this.repository.findOneOrFail({
      //   where: { id: entity.id as any },
      // });

      // const { id: resourceId, type, ...attributes } = updatedEntity;
      // return new ResourceDto<T>(resourceId, type, attributes);
    }

    async delete(id: any): Promise<T> {
      const entity = await this.repository.findOneOrFail({ where: { id } });

      return this.repository.remove(entity);

      // const { id: resourceId, type, ...attributes } = entity;
      // return new ResourceDto<T>(resourceId, type, attributes);
    }
  }

  return CrudService;
}
