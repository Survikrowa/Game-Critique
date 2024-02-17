import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { FriendsActivityService } from './friends_activity.service';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt.guard';
import { User } from '../../auth/auth.decorators';
import { UserAuthDTO } from '../../auth/auth.dto';
import { FriendsActivityDTO } from './friends_activity.dto';
import { Query } from '@nestjs/graphql';

@Injectable()
export class FriendsActivityResolver {
  constructor(
    private readonly friendsActivityService: FriendsActivityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [FriendsActivityDTO], { name: 'friendsActivity' })
  async getFriendsActivity(
    @User() user: UserAuthDTO,
  ): Promise<FriendsActivityDTO[]> {
    const userFriendsActivity =
      await this.friendsActivityService.getFriendsActivity(user.sub);
    if (!userFriendsActivity) {
      throw new NotFoundException('Nie znaleziono żadnych znajomych.');
    }
    return userFriendsActivity;
  }
}
