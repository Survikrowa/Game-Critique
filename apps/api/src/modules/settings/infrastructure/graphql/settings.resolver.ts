import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../../auth/infrastructure/graphql/auth.dto';
import { UserSettingsObject } from './settings.model';

@Resolver()
export class SettingsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserSettingsObject, { nullable: true })
  async getUserSettings(
    @User() user: UserAuthDTO,
  ): Promise<UserSettingsObject | null> {
    const settings = await this.prisma.userSettings.findUnique({
      where: { oauthId: user.sub },
    });
    if (!settings || !settings.platformIds) return null;
    return {
      platformIds: settings.platformIds.split(',').filter(Boolean).map(Number),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateUserSettings(
    @User() user: UserAuthDTO,
    @Args('platformIds', { type: () => [Int] }) platformIds: number[],
  ): Promise<boolean> {
    const stored = platformIds.join(',');
    await this.prisma.userSettings.upsert({
      where: { oauthId: user.sub },
      create: { oauthId: user.sub, platformIds: stored },
      update: { platformIds: stored },
    });
    return true;
  }
}
