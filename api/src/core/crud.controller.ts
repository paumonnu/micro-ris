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
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { BaseEntity } from './entities/base.entity';
import { ICrudService } from './crud.service';
import { CrudValidationPipe } from './crud-validation.pipe';
import { Page } from './dto/pagination.dto';
import { ResourceByIdDto } from './dto/uuid.dto';
import { queryOneBuilder } from './utils/query';
import { QueryOneDto } from './dto/query.dto';
import { SerializeInterceptor } from './serializer/serialize.interceptor';

export interface ICrudController<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  getOne(query: QueryOneDto, id: ResourceByIdDto): Promise<EntityType>;

  get(query: QueryDto): Promise<Page<EntityType>>;

  create(body: CreateDto): Promise<EntityType>;

  update(id: ResourceByIdDto, body: UpdateDto): Promise<EntityType>;

  delete(id: ResourceByIdDto): Promise<EntityType>;
}

export function CRUDControllerFactory<T extends BaseEntity, C, U, Q>(
  entityDto: Type<T>,
  createDto: Type<C>,
  updateDto: Type<U>,
  queryDto: Type<Q>,
): Type<ICrudController<T, C, U, Q>> {
  const createPipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    body: createDto,
  });

  const updatePipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    body: updateDto,
  });

  const queryOnePipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    query: QueryOneDto,
  });

  const queryPipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    query: queryDto,
  });

  class CrudController<T extends BaseEntity, C, U, Q>
    implements ICrudController<T, C, U, Q>
  {
    protected service: ICrudService<T, C, U, Q>;

    @Post()
    @HttpCode(201)
    @UsePipes(createPipe)
    @UseInterceptors(SerializeInterceptor)
    async create(@Body() body: C): Promise<T> {
      return await this.service.create(body);
    }

    @Get(':id')
    @UsePipes(queryOnePipe)
    @UseInterceptors(SerializeInterceptor)
    async getOne(
      @Query() query: QueryOneDto,
      @Param() params: ResourceByIdDto,
    ): Promise<T> {
      const findOptions = queryOneBuilder(params.id, query);
      return await this.service.getOne(findOptions);
    }

    @Get()
    @UsePipes(queryPipe)
    // @SerializeResourcePage()
    async get(@Query() query: Q): Promise<Page<T>> {
      return await this.service.get(query);
    }

    @Delete(':id')
    // @SerializeResource()
    async delete(@Param() params: ResourceByIdDto): Promise<T> {
      return this.service.delete(params.id);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    // @SerializeResource()
    async update(
      @Param() params: ResourceByIdDto,
      @Body() body: U,
    ): Promise<T> {
      return this.service.update(params.id, body);
    }
  }

  return CrudController;
}
