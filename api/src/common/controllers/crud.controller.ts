import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ValidationPipeOptions,
  Type,
  ArgumentMetadata,
  Injectable,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ICrudService } from '../services/crud.service';
import { BaseEntity } from '../entities/base.entity';
import { GetResourceByIdDto } from '../dto/uuid.dto';
import { Serialize } from '../decorators/serialize.decorator';
import { Page } from '../dto/pagination.dto';
import { PageDto } from '../dto/serialize.dto';
import { User } from '@/src/modules/resources/users/entities/user.entity';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: { body?: Type; query?: Type; param?: Type },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

export interface ICrudController<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
  QueryDto,
> {
  getOne(id: GetResourceByIdDto): Promise<EntityType>;

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
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );

  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );

  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto },
  );

  class CrudController<T extends BaseEntity, C, U, Q>
    implements ICrudController<T, C, U, Q>
  {
    protected service: ICrudService<T, C, U, Q>;

    @Post()
    @UsePipes(createPipe)
    @Serialize(entityDto)
    async create(@Body() body: C): Promise<T> {
      const e = await this.service.create(body);
      return e;
    }

    @Get(':id')
    @Serialize(entityDto)
    async getOne(@Param() params: GetResourceByIdDto): Promise<T> {
      return await this.service.getOne(params.id);
    }

    @Get()
    @UsePipes(queryPipe)
    @Serialize(PageDto<T>)
    async get(@Query() query: Q): Promise<Page<T>> {
      return await this.service.get(query);
    }

    @Delete(':id')
    @Serialize(entityDto)
    async delete(@Param() params: GetResourceByIdDto): Promise<T> {
      return this.service.delete(params.id);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    @Serialize(entityDto)
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
