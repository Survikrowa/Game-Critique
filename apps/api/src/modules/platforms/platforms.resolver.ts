import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { PlatformsService } from './platforms.service';
import { PlatformsDTO } from './platforms.dto';

@Resolver()
export class PlatformsResolver {
  constructor(private readonly platformsService: PlatformsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => PlatformsDTO, {
    name: 'platforms',
    description: 'Get all platforms',
  })
  async getAllPlatforms() {
    return {
      platforms: this.platformsService.getAllPlatforms(),
    };
  }
}
