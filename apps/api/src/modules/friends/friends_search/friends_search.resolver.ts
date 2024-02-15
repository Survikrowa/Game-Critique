import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt.guard';
import { User } from '../../auth/auth.decorators';
import { UserAuthDTO } from '../../auth/auth.dto';
import { UsersService } from '../../users/users.service';
import { UserDTO } from '../../users/users.dto';

@Injectable()
export class FriendsSearchResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserDTO], { name: 'usersSearch' })
  async usersSearch(
    @User() user: UserAuthDTO,
    @Args('input') input: string,
  ): Promise<UserDTO[]> {
    if (input === '') {
      return [];
    }

    return this.usersService.findUsersToAddAsFriends({
      oauthId: user.sub,
      username: input,
    });
  }
}
