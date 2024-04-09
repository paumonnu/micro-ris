import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { BaseEntity } from './entities/base.entity';
import { DeepPartial, QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';
import { query } from 'express';
import { QueryDto } from './dto/query.dto';
import { access } from 'fs';

export interface ICrudService<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  create(createDto: CreateDto): Promise<EntityType>;
  get(queryDto: QueryDto): Promise<EntityType[]>;
  getOne(id: string): Promise<EntityType>;
  update(updateDto: UpdateDto): Promise<EntityType>;
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

    create(createDto: C): Promise<T> {
      const item = this.repository.create(createDto as DeepPartial<T>);
      return this.repository.save(item);
    }

    get({ page, perPage, fields, sort, ...filters }: Q): Promise<T[]> {
      // Transform fields array to TypeOrm select format
      const select = fields.reduce(
        (acc, cur) => ({
          ...acc,
          ...{
            [cur]: true,
          },
        }),
        {},
      );

      const findOptions = {
        select: select,
        skip: perPage * (page - 1),
        take: perPage,
      };

      return this.repository.find(findOptions);

      // const qb = this.repository.createQueryBuilder();
      // // Select fields
      // if (!fields) {
      //   qb.select('*');
      // } else {
      //   const select = fields.map((field) => {
      //     return `"${field}"`;
      //   });
      //   qb.select(select);
      // }
      // // Page
      // qb.offset(perPage * (page - 1));
      // // Items per page
      // qb.limit(perPage);
      // // Sort
      // if (sort) {
      //   sort.map((elem) => {
      //     const orderBy = elem.charAt(0) === '-' ? elem.substring(1) : elem;
      //     const orderDir = elem.charAt(0) === '-' ? 'DESC' : 'ASC';
      //     qb.addOrderBy(`"${orderBy}"`, orderDir);
      //   });
      // }
      // // Filter query
      // Object.keys(filters).map((field) => {
      //   const filter = filters[field];
      //   Object.keys(filter).map((op) => {
      //     const value = filter[op];
      //     const opts = {
      //       eq: '=',
      //     };
      //     qb.where(field, opts[op], value);
      //   });
      // });
      // return qb.execute();
    }

    async getOne(id: any): Promise<T> {
      if (!validate(id)) {
        throw new BadRequestException(`Id '${id}' is not valid uuid format`);
      }

      const r = await this.repository.findOne({ where: { id } });

      if (!r) {
        throw new NotFoundException(`Resource: '${id}' not found`);
      }

      return r;
    }

    update(updateDto: U): Promise<T> {
      const e = this.repository.create();
      return this.repository.save(e);
    }

    delete(id: string): Promise<T> {
      const e = this.repository.create();
      return this.repository.save(e);
    }

    private buildFilters(qb: QueryBuilder<T>, filters: object) {
      const buildNode = (qb: QueryBuilder<T>, node: object) => {
        if (node) {
        }
      };

      buildNode(qb, filters);
    }
  }

  return CrudService;
}
