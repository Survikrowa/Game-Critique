import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthUserVerification } from './auth.model';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { User } from './auth.decorators';
import { UserDTO } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => AuthUserVerification)
  async verify(@User() user: UserDTO, @Context() context: any) {
    try {
      const userInfo = await this.authService.getUserInfoFromAuth0(
        context.req.headers.authorization,
      );
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
