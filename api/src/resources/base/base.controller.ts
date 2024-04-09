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
import { ICrudService } from './base.service';
import { BaseEntity } from './entities/base.entity';
import { GetResourceByIdDto } from './dto/uuid.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Type as TypeSerializer } from 'class-transformer';

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

export interface ICrudController<EntityType, CreateDto, UpdateDto, QueryDto> {
  getOne(id: GetResourceByIdDto): Promise<EntityType>;

  get(query: QueryDto): Promise<EntityType[]>;

  create(body: CreateDto): Promise<EntityType>;

  update(body: UpdateDto): Promise<EntityType>;

  delete(id: GetResourceByIdDto): Promise<Partial<EntityType>>;
}

export function CRUDControllerFactory<T extends BaseEntity, C, U, Q>(
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
    // @Serialize()
    async create(@Body() body: C): Promise<T> {
      return this.service.create(body);
    }

    @Get(':id')
    // @TypeSerializer(() => T)
    getOne(@Param() params: GetResourceByIdDto): Promise<T> {
      return this.service.getOne(params.id);
    }

    @Get()
    @UsePipes(queryPipe)
    get(@Query() query: Q): Promise<T[]> {
      return this.service.get(query);
    }

    @Delete(':id')
    delete(@Param() params: GetResourceByIdDto): Promise<Partial<T>> {
      return this.service.delete(params.id);
    }

    @Patch()
    @UsePipes(updatePipe)
    update(@Body() body: U): Promise<T> {
      return this.service.update(body);
    }
  }

  return CrudController;
}
