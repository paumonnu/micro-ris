import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Type,
  UsePipes,
  Query,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { GetOneDto, GetOneRelationshipDto } from '../common/dto/uuid.dto';
import { Page } from '../common/dto/pagination.dto';
import {
  SerializeEntityInterceptor,
  SerializeEntityPageInterceptor,
} from '../serializer/serialize.interceptor';
import { QueryOneDto } from '../common/dto/query.dto';
import { ICrudService } from './crud.service';
import { BaseEntity } from '../common/base.entity';
import { Auth } from '../api/auth/auth.decorator';
import { CrudValidationPipe } from '../validation/crud-validation.pipe';

export interface ICrudController<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  getOne(id: GetOneDto, query: QueryOneDto): Promise<EntityType>;

  get(query: QueryDto): Promise<Page<EntityType>>;

  create(body: CreateDto): Promise<EntityType>;

  update(id: GetOneDto, body: UpdateDto): Promise<EntityType>;

  delete(id: GetOneDto): Promise<EntityType>;

  getRelationship(
    id: GetOneDto,
    relationship: string,
  ): Promise<EntityType | Page<EntityType>>;
}

export function CRUDControllerFactory<T extends BaseEntity, C, U, Q>(
  path: string,
  entityDto: Type<T>,
  createDto: Type<C>,
  updateDto: Type<U>,
  queryDto: Type<Q>,
): Type<ICrudController<T, C, U, Q>> {
  const createPipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: false,
    body: createDto,
  });

  const updatePipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: false,
    body: updateDto,
  });

  const queryPipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: false,
    query: queryDto,
  });

  class CrudController<T extends BaseEntity, C, U, Q>
    implements ICrudController<T, C, U, Q>
  {
    protected service: ICrudService<T, C, U, Q>;

    @Post(`api/resources/${path}`)
    @Auth(`resources.${path}.create`)
    @HttpCode(201)
    @UsePipes(createPipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async create(@Body() body: C): Promise<T> {
      return await this.service.create(body);
    }

    @Get(`api/resources/${path}/:id`)
    @Auth(`resources.${path}.read`)
    @UseInterceptors(SerializeEntityInterceptor)
    async getOne(
      @Param() params: GetOneDto,
      @Query() query: QueryOneDto,
    ): Promise<T> {
      return await this.service.getOne(params.id, query);
    }

    @Get(`api/resources/${path}`)
    @Auth(`resources.${path}.read`)
    @UsePipes(queryPipe)
    @UseInterceptors(SerializeEntityPageInterceptor)
    async get(@Query() query: Q): Promise<Page<T>> {
      return await this.service.get(query);
    }

    @Patch(`api/resources/${path}/:id`)
    @Auth(`resources.${path}.update`)
    @UsePipes(updatePipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async update(@Param() params: GetOneDto, @Body() body: U): Promise<T> {
      return this.service.update(params.id, body);
    }

    @Delete(`api/resources/${path}/:id`)
    @Auth(`resources.${path}.delete`)
    @UseInterceptors(SerializeEntityInterceptor)
    async delete(@Param() params: GetOneDto): Promise<T> {
      return this.service.delete(params.id);
    }

    @Get(`api/resources/${path}/:id/relationships/:relationship`)
    async getRelationship(
      @Param() params: GetOneRelationshipDto,
    ): Promise<T | Page<T>> {
      return null;
    }
  }

  return CrudController;
}
