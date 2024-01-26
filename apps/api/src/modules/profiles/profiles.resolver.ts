import { Query, Resolver } from '@nestjs/graphql';
import { ProfileInfoDTO } from './profiles.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { User } from '../auth/auth.decorators';
import { UserDTO } from '../auth/auth.dto';
import { ProfilesRepository } from './profiles.repository';

@Resolver()
export class ProfilesResolver {
  constructor(private readonly profilesRepository: ProfilesRepository) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => ProfileInfoDTO)
  async profileInfo(@User() user: UserDTO) {
    return this.profilesRepository.getProfileInfo(user.sub);
  }
}
