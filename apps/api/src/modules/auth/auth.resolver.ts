import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthUserVerification } from './auth.model';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { User } from './auth.decorators';
import { UserAuthDTO } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => AuthUserVerification)
  async verify(
    @User() user: UserAuthDTO,
    @Context() ctx: { req: { headers?: { authorization: string } } },
  ) {
    try {
      const authorizationHeader = ctx.req.headers?.authorization;
      console.log(authorizationHeader);
      if (!authorizationHeader) {
        return {
          authorized: false,
        };
      }
      const userInfo =
        await this.authService.getUserInfoFromAuth0(authorizationHeader);
      const { id } = await this.authService.createUser(user.sub);
      await this.authService.addUserCreatedEvent(id, userInfo.nickname);
      return {
        authorized: true,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return {
          authorized: true,
        };
      }
      return {
        authorized: false,
      };
    }
  }
}
