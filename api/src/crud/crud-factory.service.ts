import { Type } from '@nestjs/common';
import { BaseEntity } from '../common/base.entity';
import { QueryManyDto, QueryOneDto } from '../common/dto/query.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Page } from '../common/dto/pagination.dto';
import { queryManyBuilder, queryOneBuilder } from '../utils/query';

export class CRUDServiceRelationshipOptions<R extends BaseEntity> {
  name: string;
  entity: R;
}

export class CRUDServiceActionOptions {
  [name: string]: {
    handler: string;
    dto: Type;
  };
}

export class CRUDServiceOptions<T extends BaseEntity> {
  // path: string;
  // entity: T;
  // queryDto?: Type;
  // createDto?: Type;
  // updateDto?: Type;
  // relationships?: Array<CRUDServiceRelationshipOptions<BaseEntity>>;
  // actions?: Array<CRUDServiceActionOptions>;
}

export interface ICrudService<T extends BaseEntity> {
  get(queryDto: QueryManyDto): Promise<Page<T>>;
  getOne(id: string, queryDto: QueryOneDto): Promise<T>;
  create(createDto: DeepPartial<T>): Promise<T>;
  update(id: string, updateDto: DeepPartial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

export function CRUDServiceFactory<T extends BaseEntity>(): Type<
  ICrudService<T>
> {
  class CrudService<T extends BaseEntity> implements ICrudService<T> {
    protected repository: Repository<T>;

    async get(queryDto: any): Promise<Page<T>> {
      const queryOptions = queryManyBuilder(queryDto);

      const [result, total] = await this.repository.findAndCount(queryOptions);

      const pageResult = new Page<T>(result, {
        page: queryDto.page,
        limit: queryDto.limit,
        count: total,
      });

      return pageResult;
    }

    async getOne(id: any, queryDto?: QueryOneDto): Promise<T> {
      const queryOptions = queryOneBuilder(id, queryDto);

      const entity = await this.repository.findOneOrFail(queryOptions);

      return entity;
    }

    async create(createDto: DeepPartial<T>): Promise<T> {
      const item = this.repository.create(createDto);

      const createResult = await this.repository.save(item);

      return await this.repository.findOneOrFail({
        where: { id: createResult.id as any },
      });
    }

    async update(id: any, updateDto: DeepPartial<T>): Promise<T> {
      const entity = await this.repository.findOneOrFail({ where: { id } });

      const updateResult = await this.repository.save(
        Object.assign(entity, updateDto),
      );

      return updateResult;
    }

    async delete(id: any): Promise<T> {
      const entity = await this.repository.findOneOrFail({ where: { id } });

      return this.repository.remove(entity);
    }
  }

  return CrudService;
}
