import {
  And,
  Between,
  Equal,
  FindManyOptions,
  FindOneOptions,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

import { QueryManyDto, QueryOneDto } from '../common/dto/query.dto';

export const validQueryOperators = {
  eq: Equal,
  nt: Not,
  lt: LessThan,
  gt: MoreThan,
  lte: LessThanOrEqual,
  gte: MoreThanOrEqual,
  lk: Like,
  bt: Between,
  in: In,
};

function parseFilters(filters: object): object {
  const findOptionsWhere = {};

  Object.keys(filters).map((field) => {
    const fieldWhere = [];

    // Check is object
    if (
      typeof filters[field] === 'object' &&
      !Array.isArray(filters[field]) &&
      filters[field] !== null
    ) {
      Object.keys(filters[field]).map((op) => {
        const filterValue = filters[field][op];
        let whereOp;

        switch (op) {
          case 'bt':
            const betweenParams = filterValue.split(',');
            whereOp = Between(betweenParams[0], betweenParams[1]);
            break;
          case 'in':
            const inParams = filterValue.split(',');
            whereOp = In(inParams);
            break;
          // case 'lk':
          //   whereOp = Like('%' + filterValue + '%');
          //   break;
          default:
            whereOp = validQueryOperators[op](filterValue);
            break;
        }

        fieldWhere.push(whereOp);
      });
    } else {
      fieldWhere.push(Equal(filters[field]));
    }

    if (fieldWhere.length) {
      findOptionsWhere[field] = And(...fieldWhere);
    }
  });

  return findOptionsWhere;
}

function parseFields(fields: string): string[] {
  const select = fields ? fields.split(',') : null;
  if (select && !select.includes('id')) {
    select.push('id');
  }

  return select;
}

function parseIncludes(includes: string): string[] {
  const relations = includes ? includes.split(',') : null;

  return relations;
}

export function queryOneBuilder(
  id: string,
  queryDto?: QueryOneDto,
): FindOneOptions {
  const queryOptions: FindOneOptions = {};

  // Select fields
  // if (queryDto.fields) {
  //   queryOptions.select = parseFields(queryDto.fields);
  // }

  // Include relations
  if (queryDto && queryDto.include) {
    queryOptions.relations = parseIncludes(queryDto.include);
  }

  queryOptions.where = { id };

  return queryOptions;
}

export function queryManyBuilder(queryDto: QueryManyDto): FindManyOptions {
  const { include, page, limit, sort, ...filters } = queryDto;
  const queryOptions: FindManyOptions = {};

  // Select fields
  // if (fields) {
  //   queryOptions.select = parseFields(fields);
  // }

  // Include relations
  if (include) {
    queryOptions.relations = parseIncludes(include);
  }

  // Filters
  if (Object.keys(filters).length) {
    queryOptions.where = parseFilters(filters);
  }

  // Pagination
  queryOptions.skip = limit * (page - 1);

  // Limit selection
  queryOptions.take = limit;

  // Sort fields
  const order = queryDto.sort ? queryDto.sort.split(',') : ['id'];
  queryOptions.order = order.reduce((acc, cur) => {
    const orderField = cur.startsWith('-') ? cur.substring(1) : cur;
    const orderBy = cur.startsWith('-') ? 'DESC' : 'ASC';

    return {
      ...acc,
      ...{
        [orderField]: orderBy,
      },
    };
  }, {});

  return queryOptions;
}
