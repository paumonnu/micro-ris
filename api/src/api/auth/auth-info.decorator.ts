import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthInfo = createParamDecorator((ectx: ExecutionContext) => {
  const ctx = ectx.getArgByIndex(1);

  return ctx.req.authInfo ? ctx.req.authInfo : null;
});

export const CurrentUser = createParamDecorator(
  (property: string, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(1);

    if (!ctx.req.authInfo) {
      return null;
    }

    return property
      ? ctx.req.authInfo.user() && ctx.req.authInfo.user()[property]
      : ctx.req.authInfo.user();
  },
);
