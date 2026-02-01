import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthUserVerification } from './auth.model';
import { JwtAuthGuard } from '../guards/auth-jwt.guard';
import { User } from '../decorators/auth.decorators';
import { UserAuthDTO } from './auth.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create_user/create_user.command';
import { GetUserRoleQuery } from '../../application/queries/get_user_role/get_user_role.query';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => AuthUserVerification)
  async verify(
    @User() user: UserAuthDTO,
    @Context() ctx: { req: { headers?: { authorization: string } } },
  ) {
    try {
      const authorizationHeader = ctx.req.headers?.authorization;
      if (!authorizationHeader) {
        return {
          authorized: false,
        };
      }
      const userInfo =
        await this.authService.getUserInfoFromAuth0(authorizationHeader);
      const { id, role } = await this.commandBus.execute(
        new CreateUserCommand(user.sub),
      );
      await this.authService.addUserCreatedEvent(id, userInfo.nickname);
      return {
        authorized: true,
        role,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        const userRole = await this.queryBus.execute(
          new GetUserRoleQuery(user.sub),
        );
        return {
          authorized: true,
          role: userRole?.role || null,
        };
      }
      return {
        authorized: false,
      };
    }
  }
}
