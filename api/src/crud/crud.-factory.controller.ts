import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Type,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BaseEntity } from '../common/base.entity';
import { GetOneDto, GetRelationshipDto } from '../common/dto/uuid.dto';
import { QueryManyDto, QueryOneDto } from '../common/dto/query.dto';
import { Auth } from '../api/auth/auth.decorator';
import {
  SerializeEntityInterceptor,
  SerializeEntityPageInterceptor,
} from '../serializer/serialize.interceptor';
import { Page } from '../common/dto/pagination.dto';
import { CrudValidationPipe } from '../validation/crud-validation.pipe';
import { ICrudService } from './crud-factory.service';
import { NotFoundError } from 'rxjs';

export interface CRUDControllerRelationship<T extends BaseEntity> {
  service: ICrudService<T>;
}

export interface CRUDControllerRelations<T extends BaseEntity> {
  [name: string]: CRUDControllerRelationship<T>;
}

export interface CRUDControllerActionOptions {
  [name: string]: {
    handler: string;
    dto: Type;
  };
}

export interface CRUDPermissions {
  create?: string | string[];
  read?: string | string[];
  update?: string | string[];
  delete?: string | string[];
}

export interface CRUDDtos {
  create?: Type;
  read?: Type;
  readOne?: Type;
  update?: Type;
  delete?: Type;
}

export interface CRUDControllerFactoryOptions<T extends BaseEntity> {
  basePath: string;
  name: string;
  // permissions?: CRUDPermissions;
  dtos?: CRUDDtos;
  // service: ICrudService<T>;
  // queryDto?: Type;
  // createDto?: Type;
  // updateDto?: Type;
  // relationships?: Array<CRUDControllerRelationshipOptions<BaseEntity>>;
  // actions?: Array<CRUDControllerActionOptions>;
}

export interface CRUDControllerInitOptions<T extends BaseEntity> {
  service: ICrudService<T>;
  relations: CRUDControllerRelations<T>;
}

export interface ICrudController<T extends BaseEntity> {
  init(options: CRUDControllerInitOptions<T>);
  get(query: QueryManyDto): Promise<Page<T>>;
  getOne(params: GetOneDto, query: QueryOneDto): Promise<T>;
  create(body: Type): Promise<T>;
  update(params: GetOneDto, body: Type): Promise<T>;
  // delete(params: GetOneDto): Promise<T>;
}

export interface CRUDControllerOptions {}

export function CRUDControllerFactory<T extends BaseEntity>(
  options: CRUDControllerFactoryOptions<T>,
): Type<ICrudController<T>> {
  let queryManyPipe;
  if (options.dtos && options.dtos.read) {
    queryManyPipe = new CrudValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      query: options.dtos.read,
    });
  }

  let queryOnePipe;
  if (options.dtos && options.dtos.readOne) {
    queryOnePipe = new CrudValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      query: options.dtos.readOne,
    });
  }

  let createPipe;
  if (options.dtos && options.dtos.create) {
    createPipe = new CrudValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      body: options.dtos.create,
    });
  }

  let updatePipe;
  if (options.dtos && options.dtos.update) {
    updatePipe = new CrudValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      body: options.dtos.update,
    });
  }

  class CrudController<T extends BaseEntity> implements ICrudController<T> {
    protected service: ICrudService<T>;
    protected relations: CRUDControllerRelations<T>;

    init(options: CRUDControllerInitOptions<T>) {
      const { service, relations } = options;
      this.service = service;
      this.relations = relations;
    }

    @Get(`${options.basePath}/${options.name}`)
    @Auth(`resources.${options.name}.read`)
    @UsePipes(queryManyPipe)
    @UseInterceptors(SerializeEntityPageInterceptor)
    async get(@Query() query: QueryManyDto): Promise<Page<T>> {
      return await this.service.get(query);
    }

    @Get(`${options.basePath}/${options.name}/:id`)
    @Auth(`resources.${options.name}.read`)
    @UsePipes(queryOnePipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async getOne(
      @Param() params: GetOneDto,
      @Query() query: QueryOneDto,
    ): Promise<T> {
      return await this.service.getOne(params.id, query);
    }

    @Post(`${options.basePath}/${options.name}`)
    @HttpCode(201)
    @Auth(`resources.${options.name}.create`)
    @UsePipes(createPipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async create(@Body() body): Promise<T> {
      return await this.service.create(body);
    }

    @Patch(`${options.basePath}/${options.name}/:id`)
    @Auth(`resources.${options.name}.update`)
    @UsePipes(updatePipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async update(@Param() params: GetOneDto, @Body() body): Promise<T> {
      return await this.service.update(params.id, body);
    }

    @Delete(`${options.basePath}/${options.name}/:id`)
    @HttpCode(204)
    @Auth(`resources.${options.name}.delete`)
    async delete(@Param() params: GetOneDto) {
      await this.service.delete(params.id);
      return null;
    }

    @Get(`${options.basePath}/${options.name}/:id/relations/:relation`)
    // @Auth(`${ ? .read : []}`)
    // @UsePipes(queryOnePipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async getRelationship(
      @Param() params: GetRelationshipDto,
      @Query() query: QueryOneDto,
    ): Promise<T> {
      // Check relationship exists
      if (!Object.keys(this.relations).includes(params.relation)) {
        throw new NotFoundError(
          `Relationship ${params.relation} doesn't exist on resource ${options.name}`,
        );
      }

      return null;
    }
  }

  return CrudController;
}
