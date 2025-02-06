import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (property: string, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(1);

    return property
      ? ctx.req.authInfo.user && ctx.req.authInfo.user[property]
      : ctx.req.authInfo.user;
  },
);
