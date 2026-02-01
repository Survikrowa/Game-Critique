import { Injectable, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/auth-jwt.guard';
import { FriendsListService } from './friends_list.service';
import { User } from '../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../auth/infrastructure/graphql/auth.dto';
import { FriendsListDTO } from './friends_list.dto';

@Injectable()
export class FriendsListResolver {
  constructor(private readonly friendsListService: FriendsListService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => FriendsListDTO, { name: 'friendsList' })
  async getFriendsList(@User() user: UserAuthDTO): Promise<FriendsListDTO> {
    const friends = await this.friendsListService.getFriendsList(user.sub);
    return {
      friends,
    };
  }
}
