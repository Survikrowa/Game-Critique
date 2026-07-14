import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../../auth/infrastructure/graphql/auth.dto';
import { RegisterPushTokenCommand } from '../../application/commands/register_push_token/register_push_token.command';
import { UnregisterPushTokenCommand } from '../../application/commands/unregister_push_token/unregister_push_token.command';
import { GetNotificationPreferencesQuery } from '../../application/queries/get_notification_preferences/get_notification_preferences.query';
import {
  NotificationPreferencesObject,
  NotificationPreferencesInput,
} from './notifications.model';
import { PrismaService } from '../../../database/prisma.service';

@Resolver()
export class NotificationsResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async registerPushToken(
    @User() user: UserAuthDTO,
    @Args('token') token: string,
    @Args('platform') platform: string,
  ): Promise<boolean> {
    return this.commandBus.execute(
      new RegisterPushTokenCommand(user.sub, token, platform),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unregisterPushToken(@Args('token') token: string): Promise<boolean> {
    return this.commandBus.execute(new UnregisterPushTokenCommand(token));
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => NotificationPreferencesObject, { nullable: true })
  async getNotificationPreferences(
    @User() user: UserAuthDTO,
  ): Promise<NotificationPreferencesObject | null> {
    return this.queryBus.execute(new GetNotificationPreferencesQuery(user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateNotificationPreferences(
    @User() user: UserAuthDTO,
    @Args('input') input: NotificationPreferencesInput,
  ): Promise<boolean> {
    const updateData = buildPreferencesUpdateData(input);
    await this.prisma.notificationPreferences.upsert({
      where: { oauthId: user.sub },
      create: { oauthId: user.sub, ...updateData },
      update: updateData,
    });
    return true;
  }
}

function buildPreferencesUpdateData(
  input: NotificationPreferencesInput,
): Record<string, boolean> {
  const data: Record<string, boolean> = {};
  if (input.friendActivity !== undefined)
    data.friendActivity = input.friendActivity;
  if (input.friendInvites !== undefined)
    data.friendInvites = input.friendInvites;
  if (input.weeklySummary !== undefined)
    data.weeklySummary = input.weeklySummary;
  if (input.releaseReminders !== undefined)
    data.releaseReminders = input.releaseReminders;
  return data;
}
