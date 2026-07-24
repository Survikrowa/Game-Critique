import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../../auth/infrastructure/graphql/auth.dto';
import { AddReminderInput } from './release_reminders.dto';
import { GameReminderObject } from './release_reminders.model';
import { AddReminderCommand } from '../../application/commands/add_reminder/add_reminder.command';
import { RemoveReminderCommand } from '../../application/commands/remove_reminder/remove_reminder.command';
import { GetUserRemindersQuery } from '../../application/queries/get_user_reminders/get_user_reminders.query';
import { CheckReminderStatusQuery } from '../../application/queries/check_reminder_status/check_reminder_status.query';
import { GameReminder } from '../../domain/models/game_reminder.model';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ReleaseRemindersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => GameReminderObject)
  async addReminder(
    @User() user: UserAuthDTO,
    @Args('input') input: AddReminderInput,
  ): Promise<GameReminderObject> {
    const reminder = await this.commandBus.execute(
      new AddReminderCommand(user.sub, input),
    );
    return {
      id: reminder.id,
      igdbId: reminder.igdbId,
      gameName: reminder.gameName,
      gameUrl: reminder.gameUrl,
      releaseDate: reminder.releaseDate,
      coverUrl: reminder.coverUrl ?? undefined,
      createdAt: reminder.createdAt,
    };
  }

  @Mutation(() => Boolean)
  async removeReminder(
    @User() user: UserAuthDTO,
    @Args('igdbId', { type: () => Int }) igdbId: number,
  ): Promise<boolean> {
    return this.commandBus.execute(new RemoveReminderCommand(user.sub, igdbId));
  }

  @Query(() => [GameReminderObject])
  async getUserReminders(
    @User() user: UserAuthDTO,
  ): Promise<GameReminderObject[]> {
    const reminders = await this.queryBus.execute<
      GetUserRemindersQuery,
      GameReminder[]
    >(new GetUserRemindersQuery(user.sub));
    return reminders.map((r) => ({
      id: r.id,
      igdbId: r.igdbId,
      gameName: r.gameName,
      gameUrl: r.gameUrl,
      releaseDate: r.releaseDate,
      coverUrl: r.coverUrl ?? undefined,
      createdAt: r.createdAt,
    }));
  }

  @Query(() => Boolean)
  async checkReminderStatus(
    @User() user: UserAuthDTO,
    @Args('igdbId', { type: () => Int }) igdbId: number,
  ): Promise<boolean> {
    return this.queryBus.execute(
      new CheckReminderStatusQuery(user.sub, igdbId),
    );
  }
}
