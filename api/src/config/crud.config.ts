import { CrudGlobalConfig } from '@dataui/crud';
import {
  SerializeEntityInterceptor,
  SerializePageInterceptor,
} from '../serializer/serialize.interceptor';

export const crudConfig: CrudGlobalConfig = {
  query: {
    limit: 25,
    cache: 0,
    alwaysPaginate: true,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  auth: {
    property: 'authInfo',
  },
  routes: {
    getManyBase: {
      interceptors: [SerializePageInterceptor],
    },
    getOneBase: {
      interceptors: [SerializeEntityInterceptor],
    },
    createOneBase: {
      returnShallow: true,
      interceptors: [SerializeEntityInterceptor],
    },
    createManyBase: {},
    updateOneBase: {
      returnShallow: true,
      interceptors: [SerializeEntityInterceptor],
    },
    replaceOneBase: {},
    deleteOneBase: {},
    recoverOneBase: {},
  },
  serialize: {
    getMany: false,
    get: false,
    create: false,
    createMany: false,
    update: false,
    replace: false,
    delete: false,
    recover: false,
  },
};
