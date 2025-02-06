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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ICrudService } from './crud.service';
import { BaseEntity } from './entities/base.entity';
import { GetResourceByIdDto } from './dto/uuid.dto';
import { Page } from './dto/pagination.dto';
import { AuthGuard } from '@/src/api/auth/auth.guard';
import {
  SerializeEntityInterceptor,
  SerializeEntityPageInterceptor,
} from '../serializer/serialize.interceptor';
import { QueryOneDto } from './dto/query.dto';
import { CrudValidationPipe } from '@/src/validation/crud-validation.pipe';
import { Permissions } from '../api/auth/permissions.decorator';
import { Secured } from '../api/auth/secured.decorator';

export interface ICrudController<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  getOne(id: GetResourceByIdDto, query: QueryOneDto): Promise<EntityType>;

  get(query: QueryDto): Promise<Page<EntityType>>;

  create(body: CreateDto): Promise<EntityType>;

  update(id: GetResourceByIdDto, body: UpdateDto): Promise<EntityType>;

  delete(id: GetResourceByIdDto): Promise<EntityType>;
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

  const queryPipe = new CrudValidationPipe({
    whitelist: true,
    transform: true,
    query: queryDto,
  });

  @Secured()
  class CrudController<T extends BaseEntity, C, U, Q>
    implements ICrudController<T, C, U, Q>
  {
    protected service: ICrudService<T, C, U, Q>;

    @Post()
    @HttpCode(201)
    @UsePipes(createPipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async create(@Body() body: C): Promise<T> {
      return await this.service.create(body);
    }

    @Get(':id')
    @UseInterceptors(SerializeEntityInterceptor)
    async getOne(
      @Param() params: GetResourceByIdDto,
      @Query() query: QueryOneDto,
    ): Promise<T> {
      return await this.service.getOne(params.id, query);
    }

    @Get()
    @UsePipes(queryPipe)
    @UseInterceptors(SerializeEntityPageInterceptor)
    async get(@Query() query: Q): Promise<Page<T>> {
      return await this.service.get(query);
    }

    @Delete(':id')
    @UseInterceptors(SerializeEntityInterceptor)
    async delete(@Param() params: GetResourceByIdDto): Promise<T> {
      return this.service.delete(params.id);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    @UseInterceptors(SerializeEntityInterceptor)
    async update(
      @Param() params: GetResourceByIdDto,
      @Body() body: U,
    ): Promise<T> {
      return this.service.update(params.id, body);
      // return new ResourceResponseDto<T>(result);
    }
  }

  return CrudController;
}
