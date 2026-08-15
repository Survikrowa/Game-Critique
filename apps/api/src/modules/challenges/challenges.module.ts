import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

import { ChallengesResolver } from './infrastructure/graphql/challenges.resolver';

import { CreateChallengeGroupCommandHandler } from './application/commands/create_challenge_group/create_challenge_group.handler';
import { InviteGroupMemberCommandHandler } from './application/commands/invite_group_member/invite_group_member.handler';
import { AcceptGroupInviteCommandHandler } from './application/commands/accept_group_invite/accept_group_invite.handler';
import { DeclineGroupInviteCommandHandler } from './application/commands/decline_group_invite/decline_group_invite.handler';
import { CreateChallengeCommandHandler } from './application/commands/create_challenge/create_challenge.handler';
import { AcceptChallengeCommandHandler } from './application/commands/accept_challenge/accept_challenge.handler';
import { DeclineChallengeCommandHandler } from './application/commands/decline_challenge/decline_challenge.handler';
import { ForfeitChallengeCommandHandler } from './application/commands/forfeit_challenge/forfeit_challenge.handler';

import { GetChallengeGroupsQueryHandler } from './application/queries/get_challenge_groups/get_challenge_groups.handler';
import { GetGroupLeaderboardQueryHandler } from './application/queries/get_group_leaderboard/get_group_leaderboard.handler';
import { GetChallengesQueryHandler } from './application/queries/get_challenges/get_challenges.handler';

import { CHALLENGE_GROUP_REPOSITORY } from './domain/ports/challenge-group.repository.port';
import { CHALLENGE_REPOSITORY } from './domain/ports/challenge.repository.port';
import { PrismaChallengeGroupRepository } from './infrastructure/adapters/prisma-challenge-group.repository';
import { PrismaChallengeRepository } from './infrastructure/adapters/prisma-challenge.repository';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    ChallengesResolver,
    CreateChallengeGroupCommandHandler,
    InviteGroupMemberCommandHandler,
    AcceptGroupInviteCommandHandler,
    DeclineGroupInviteCommandHandler,
    CreateChallengeCommandHandler,
    AcceptChallengeCommandHandler,
    DeclineChallengeCommandHandler,
    ForfeitChallengeCommandHandler,
    GetChallengeGroupsQueryHandler,
    GetGroupLeaderboardQueryHandler,
    GetChallengesQueryHandler,
    {
      provide: CHALLENGE_GROUP_REPOSITORY,
      useClass: PrismaChallengeGroupRepository,
    },
    { provide: CHALLENGE_REPOSITORY, useClass: PrismaChallengeRepository },
  ],
})
export class ChallengesModule {}
