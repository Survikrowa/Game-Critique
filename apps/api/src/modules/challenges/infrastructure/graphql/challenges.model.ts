import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  ChallengeStatus,
  ChallengeType,
  ChallengeGroupMemberRole,
  ChallengeGroupMemberStatus,
} from '@prisma/client';

registerEnumType(ChallengeType, { name: 'ChallengeType' });
registerEnumType(ChallengeStatus, { name: 'ChallengeStatus' });
registerEnumType(ChallengeGroupMemberRole, {
  name: 'ChallengeGroupMemberRole',
});
registerEnumType(ChallengeGroupMemberStatus, {
  name: 'ChallengeGroupMemberStatus',
});

@ObjectType('ChallengeGroup')
export class ChallengeGroupObject {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  ownerId: string;

  @Field(() => [ChallengeGroupMemberObject])
  members: ChallengeGroupMemberObject[];
}

@ObjectType('ChallengeGroupMember')
export class ChallengeGroupMemberObject {
  @Field()
  oauthId: string;

  @Field(() => ChallengeGroupMemberRole)
  role: ChallengeGroupMemberRole;

  @Field(() => ChallengeGroupMemberStatus)
  status: ChallengeGroupMemberStatus;
}

@ObjectType('LeaderboardEntry')
export class LeaderboardEntryObject {
  @Field()
  oauthId: string;

  @Field()
  name: string;

  @Field()
  avatarUrl: string;

  @Field()
  completedCount: number;

  @Field()
  forfeitedCount: number;
}

@ObjectType('Challenge')
export class ChallengeObject {
  @Field(() => ID)
  id: number;

  @Field()
  groupId: number;

  @Field()
  challengerId: string;

  @Field()
  recipientId: string;

  @Field(() => ChallengeType)
  type: ChallengeType;

  @Field(() => ChallengeStatus)
  status: ChallengeStatus;

  @Field()
  gameId: number;

  @Field({ nullable: true })
  gameName?: string;

  @Field({ nullable: true })
  gameCover?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  challengerName?: string;

  @Field({ nullable: true })
  recipientName?: string;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field({ nullable: true })
  forfeitedAt?: Date;
}
