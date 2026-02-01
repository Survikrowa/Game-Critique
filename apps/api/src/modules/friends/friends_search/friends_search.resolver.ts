import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/auth-jwt.guard';
import { UserAuthDTO } from '../../auth/infrastructure/graphql/auth.dto';
import { User } from '../../auth/infrastructure/decorators/auth.decorators';
import { UserSearchResultDTO } from './friends_resolver.dto';
import { FriendsSearchService } from './friends_search.service';

@Injectable()
export class FriendsSearchResolver {
  constructor(private readonly friendsSearch: FriendsSearchService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserSearchResultDTO], { name: 'usersSearch' })
  async usersSearch(
    @User() user: UserAuthDTO,
    @Args('input') input: string,
  ): Promise<UserSearchResultDTO[]> {
    if (input === '') {
      return [];
    }

    return this.friendsSearch.findUsersToAddAsFriends({
      oauthId: user.sub,
      username: input,
    });
  }
}
