import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChallengeStatus } from '@prisma/client';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../../auth/infrastructure/graphql/auth.dto';
import {
  ChallengeGroupObject,
  ChallengeObject,
  LeaderboardEntryObject,
} from './challenges.model';
import { CreateChallengeInput } from './challenges.dto';

import { CreateChallengeGroupCommand } from '../../application/commands/create_challenge_group/create_challenge_group.command';
import { InviteGroupMemberCommand } from '../../application/commands/invite_group_member/invite_group_member.command';
import { AcceptGroupInviteCommand } from '../../application/commands/accept_group_invite/accept_group_invite.command';
import { DeclineGroupInviteCommand } from '../../application/commands/decline_group_invite/decline_group_invite.command';
import { CreateChallengeCommand } from '../../application/commands/create_challenge/create_challenge.command';
import { AcceptChallengeCommand } from '../../application/commands/accept_challenge/accept_challenge.command';
import { DeclineChallengeCommand } from '../../application/commands/decline_challenge/decline_challenge.command';
import { ForfeitChallengeCommand } from '../../application/commands/forfeit_challenge/forfeit_challenge.command';
import { CompleteChallengeCommand } from '../../application/commands/complete_challenge/complete_challenge.command';
import { ConfirmChallengeCompletionCommand } from '../../application/commands/confirm_challenge_completion/confirm_challenge_completion.command';

import { GetChallengeGroupsQuery } from '../../application/queries/get_challenge_groups/get_challenge_groups.query';
import { GetGroupLeaderboardQuery } from '../../application/queries/get_group_leaderboard/get_group_leaderboard.query';
import { GetChallengesQuery } from '../../application/queries/get_challenges/get_challenges.query';

@Resolver()
export class ChallengesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ChallengeGroupObject])
  async challengeGroups(@User() user: UserAuthDTO) {
    return this.queryBus.execute(new GetChallengeGroupsQuery(user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [LeaderboardEntryObject])
  async groupLeaderboard(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
  ) {
    return this.queryBus.execute(
      new GetGroupLeaderboardQuery(groupId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ChallengeObject])
  async challenges(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('status', { type: () => ChallengeStatus, nullable: true })
    status?: ChallengeStatus,
  ) {
    return this.queryBus.execute(
      new GetChallengesQuery(groupId, user.sub, status),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeGroupObject)
  async createChallengeGroup(
    @User() user: UserAuthDTO,
    @Args('name') name: string,
  ) {
    return this.commandBus.execute(
      new CreateChallengeGroupCommand(name, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeGroupObject)
  async inviteMember(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('oauthId') oauthId: string,
  ) {
    return this.commandBus.execute(
      new InviteGroupMemberCommand(groupId, user.sub, oauthId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async acceptGroupInvite(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
  ) {
    return this.commandBus.execute(
      new AcceptGroupInviteCommand(groupId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async declineGroupInvite(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
  ) {
    return this.commandBus.execute(
      new DeclineGroupInviteCommand(groupId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeObject)
  async createChallenge(
    @User() user: UserAuthDTO,
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('recipientOauthId') recipientOauthId: string,
    @Args('input') input: CreateChallengeInput,
  ) {
    return this.commandBus.execute(
      new CreateChallengeCommand(
        groupId,
        user.sub,
        recipientOauthId,
        input.type,
        input.gameId,
        input.description ?? null,
      ),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeObject)
  async acceptChallenge(
    @User() user: UserAuthDTO,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.commandBus.execute(
      new AcceptChallengeCommand(challengeId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async declineChallenge(
    @User() user: UserAuthDTO,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.commandBus.execute(
      new DeclineChallengeCommand(challengeId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeObject)
  async forfeitChallenge(
    @User() user: UserAuthDTO,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.commandBus.execute(
      new ForfeitChallengeCommand(challengeId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeObject)
  async completeChallenge(
    @User() user: UserAuthDTO,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.commandBus.execute(
      new CompleteChallengeCommand(challengeId, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChallengeObject)
  async confirmChallengeCompletion(
    @User() user: UserAuthDTO,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.commandBus.execute(
      new ConfirmChallengeCompletionCommand(challengeId, user.sub),
    );
  }
}
