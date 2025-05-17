import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { PlatformsService } from './platforms.service';
import { PlatformsDTO, UpdatePlatformDisplayNameDTO } from './platforms.dto';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';

@Resolver()
export class PlatformsResolver {
  constructor(private readonly platformsService: PlatformsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => PlatformsDTO, {
    name: 'platforms',
    description: 'Get all platforms',
  })
  async getAllPlatforms(): Promise<PlatformsDTO> {
    const platforms = await this.platformsService.getAllPlatforms();
    return {
      platforms,
    };
  }

  @UseGuards(JwtAuthGuard, AdminUserGuard)
  @Mutation(() => UpdatePlatformDisplayNameDTO, {
    name: 'updatePlatformDisplayName',
    description: 'update platform display name',
  })
  async updatePlatformDisplayName(
    @Args('platformId') platformId: number,
    @Args('displayName') displayName: string,
  ): Promise<UpdatePlatformDisplayNameDTO> {
    const platform = await this.platformsService.updatePlatformDisplayName(
      platformId,
      displayName,
    );
    return {
      platform,
    };
  }
}
