import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/auth-jwt.guard';
import {
  FriendRequestResponseDTO,
  GetFriendRequestsResponseDTO,
} from './friends_requests.dto';
import { User } from '../../auth/infrastructure/decorators/auth.decorators';
import { FriendsRequestsService } from './friends_requests.service';
import { UserAuthDTO } from '../../auth/infrastructure/graphql/auth.dto';

@Injectable()
export class FriendsRequestsResolver {
  constructor(
    private readonly friendsRequestsService: FriendsRequestsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FriendRequestResponseDTO)
  async sendFriendRequest(
    @User() user: UserAuthDTO,
    @Args('receiverOauthId') receiverOauthId: string,
  ): Promise<FriendRequestResponseDTO> {
    const friendRequest = await this.friendsRequestsService.createFriendRequest(
      {
        from: user.sub,
        to: receiverOauthId,
      },
    );

    return {
      receiverId: friendRequest.receiverId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FriendRequestResponseDTO)
  async acceptFriendRequest(
    @User() user: UserAuthDTO,
    @Args('senderOauthId') senderOauthId: string,
  ): Promise<FriendRequestResponseDTO> {
    const friendRequest = await this.friendsRequestsService.acceptFriendRequest(
      {
        from: senderOauthId,
        to: user.sub,
      },
    );

    return {
      receiverId: friendRequest.receiverId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [GetFriendRequestsResponseDTO], { name: 'friendsRequests' })
  async getFriendRequests(
    @User() user: UserAuthDTO,
  ): Promise<GetFriendRequestsResponseDTO[]> {
    return this.friendsRequestsService.getFriendRequests({
      oauthId: user.sub,
    });
  }
}
