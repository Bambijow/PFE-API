import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from './users.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    req.user.salt = undefined;
    req.user.password = undefined;
    return req.user;
  },
);
