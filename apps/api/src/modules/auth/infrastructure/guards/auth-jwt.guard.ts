import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserRoleQuery } from '../../application/queries/get_user_role/get_user_role.query';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }
    const request = this.getRequest(context);
    const user = request.user;
    const userWithRole = await this.queryBus.execute(
      new GetUserRoleQuery(user.sub),
    );
    if (userWithRole) {
      request.user = {
        ...user,
        role: userWithRole.role,
      };
    }
    return true;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
