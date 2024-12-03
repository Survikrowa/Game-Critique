import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }
    const request = this.getRequest(context);
    const user = request.user;
    const userWithRole = await this.authService.getUserRole(user.sub);
    if (!userWithRole) {
      return false;
    }
    request.user = {
      ...user,
      role: userWithRole.role?.role?.role,
    };
    return true;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
