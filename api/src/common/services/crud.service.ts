import { Type } from '@nestjs/common';
import { BaseEntity } from '../entities/base.entity';
import { Between, DeepPartial, In, QueryBuilder, Repository } from 'typeorm';
import { validate } from 'uuid';
import { QueryDto } from '../dto/query.dto';
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
import { Page, PaginationMeta } from '../dto/pagination.dto';

export interface ICrudService<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  create(createDto: CreateDto): Promise<EntityType>;
  get(queryDto: QueryDto): Promise<Page<EntityType>>;
  getOne(id: string): Promise<EntityType>;
  update(id: string, updateDto: UpdateDto): Promise<EntityType>;
  delete(id: string): Promise<EntityType>;
}

export function CrudServiceFactory<
  T extends BaseEntity,
  C,
  U,
  Q extends QueryDto,
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

  class CrudService<T extends BaseEntity, C, U, Q extends QueryDto>
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

    async get({
      page = 1,
      take = 25,
      fields = [],
      sort = ['-id'],
      ...filters
    }: Q): Promise<Page<T>> {
      /* Parse select fields */
      const select = fields.reduce(
        (acc, cur) => ({
          ...acc,
          ...{
            [cur]: true,
          },
        }),
        {},
      );

      /* Parse order fields */
      const order = sort.reduce((acc, cur) => {
        const orderField = cur.startsWith('-') ? cur.substring(1) : cur;
        const orderBy = cur.startsWith('-') ? 'DESC' : 'ASC';

        return {
          ...acc,
          ...{
            [orderField]: orderBy,
          },
        };
      }, {});

      /* Create where object */
      const where = {};
      Object.keys(filters).map((field) => {
        const fieldWhere = [];

        Object.keys(filters[field]).map((op) => {
          const filterValue = filters[field][op];
          let whereOp;

          switch (op) {
            case 'eq':
              whereOp = Equal(filterValue);
              break;
            case 'nt':
              whereOp = Not(filterValue);
              break;
            case 'lt':
              whereOp = LessThan(filterValue);
              break;
            case 'gt':
              whereOp = MoreThan(filterValue);
              break;
            case 'lte':
              whereOp = LessThanOrEqual(filterValue);
              break;
            case 'gte':
              whereOp = MoreThanOrEqual(filterValue);
              break;
            case 'lk':
              whereOp = Like(filterValue);
              break;
            case 'bt':
              const betweenParams = filterValue.split(',');
              whereOp = Between(betweenParams[0], betweenParams[1]);
              break;
            case 'in':
              const inParams = filterValue.split(',');
              whereOp = In(inParams);
              break;
            default:
              break;
          }

          fieldWhere.push(whereOp);
        });

        if (fieldWhere.length) {
          where[field] = And(...fieldWhere);
        }
      });

      /* Create query object */
      const findOptions = {
        select: select,
        skip: take * (page - 1),
        take: take,
        order: order,
        where: where,
      };

      // const findResult = await this.repository.find(findOptions);
      // const count = await this.repository.count(findOptions);
      const [result, total] = await this.repository.findAndCount(findOptions);

      const pageResult = new Page<T>(result, {
        page,
        take,
        count: total,
      });

      return pageResult;
    }

    async getOne(id: any): Promise<T> {
      const entity = await this.repository.findOneOrFail({ where: { id } });

      return entity;

      // const { id: resourceId, type, ...attributes } = entity;
      // return new ResourceDto<T>(resourceId, type, attributes);
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
