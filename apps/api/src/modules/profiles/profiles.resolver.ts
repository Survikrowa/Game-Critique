import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ProfileInfoDTO,
  ProfileInfoUpdateArgsDTO,
  ProfileInfoUpdateResponseDTO,
} from './profiles.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { User } from '../auth/auth.decorators';
import { UserAuthDTO } from '../auth/auth.dto';
import { ProfilesRepository } from './profiles.repository';

@Resolver()
export class ProfilesResolver {
  constructor(private readonly profilesRepository: ProfilesRepository) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => ProfileInfoDTO)
  async profileInfo(@User() user: UserAuthDTO) {
    return this.profilesRepository.getProfileInfo(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProfileInfoUpdateResponseDTO)
  async updateProfileInfo(
    @User() user: UserAuthDTO,
    @Args({ name: 'profileInfo', type: () => ProfileInfoUpdateArgsDTO })
    profileInfo: ProfileInfoUpdateArgsDTO,
  ) {
    await this.profilesRepository.updateProfile({
      oauthId: user.sub,
      name: profileInfo.name,
      avatarUrl: profileInfo.avatarUrl,
    });
    return {
      success: true,
    };
  }
}
