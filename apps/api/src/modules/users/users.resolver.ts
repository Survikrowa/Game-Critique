import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UserDataDTO } from './users.dto';
import { Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';

@Injectable()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDataDTO)
  async user(@Args('oauthId') oauthId: string): Promise<UserDataDTO> {
    const user = await this.usersService.getUser(oauthId, {
      activityLimit: 5,
    });
    if (!user) {
      throw new NotFoundException(new Error('User not found'));
    }
    return user;
  }

  @UseGuards(JwtAuthGuard, AdminUserGuard)
  @Query(() => [UserDataDTO])
  async users(): Promise<UserDataDTO[]> {
    return [];
  }
}
