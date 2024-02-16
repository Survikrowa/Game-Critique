import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt.guard';
import { User } from '../../auth/auth.decorators';
import { UserAuthDTO } from '../../auth/auth.dto';
import { UsersService } from '../../users/users.service';
import { UserSearchResultDTO } from './friends_resolver.dto';

@Injectable()
export class FriendsSearchResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserSearchResultDTO], { name: 'usersSearch' })
  async usersSearch(
    @User() user: UserAuthDTO,
    @Args('input') input: string,
  ): Promise<UserSearchResultDTO[]> {
    if (input === '') {
      return [];
    }

    return this.usersService.findUsersToAddAsFriends({
      oauthId: user.sub,
      username: input,
    });
  }
}
