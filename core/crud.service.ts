import { Type } from '@nestjs/common';
import {
  Between,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  In,
  Repository,
} from 'typeorm';
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
import { BaseEntity } from './entities/base.entity';
import { Page } from '../../../app/serializer/dto/pagination.dto';
import { QueryManyDto, QueryOneDto } from './dto/query.dto';
import { queryManyBuilder, queryOneBuilder } from './utils/query';

export interface ICrudService<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryManyDto,
> {
  create(createDto: CreateDto): Promise<EntityType>;
  get(queryDto: QueryManyDto): Promise<Page<EntityType>>;
  getOne(findOptions: FindOneOptions): Promise<EntityType>;
  update(id: string, updateDto: UpdateDto): Promise<EntityType>;
  delete(id: string): Promise<EntityType>;
}

export function CrudServiceFactory<
  T extends BaseEntity,
  C,
  U,
  Q extends QueryManyDto,
>(): Type<ICrudService<T, C, U, Q>> {
  // const createPipe = new AbstractValidationPipe(
  //   { whitelist: true, transform: true },
  //   { body: createDto },
  // );
  // const updatePipe = new AbstractValidationPipe(
  //   { whitelist: true, transform: true },
  //   { body: updateDto },
  // );
  // const queryPipe = new AbstractValidationPipe(
  //   { whitelist: true, transform: true },
  //   { query: queryDto },
  // );

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
      const findOptions: FindManyOptions = queryManyBuilder(queryDto);

      const [result, total] = await this.repository.findAndCount(findOptions);

      const pageResult = new Page<T>();

      pageResult.init(result, {
        page: queryDto.page,
        take: queryDto.limit,
        count: total,
      });

      return pageResult;
    }

    async getOne(findOptions: FindOneOptions): Promise<T> {
      return await this.repository.findOneOrFail(findOptions);
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
