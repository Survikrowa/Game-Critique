import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ChallengeStatus } from '@prisma/client';
import { CreateChallengeInput } from './challenges.dto';

@ArgsType()
export class GroupIdArgs {
  @Field(() => Int)
  groupId: number;
}

@ArgsType()
export class GroupIdOptionalStatusArgs {
  @Field(() => Int)
  groupId: number;

  @Field(() => ChallengeStatus, { nullable: true })
  status?: ChallengeStatus;
}

@ArgsType()
export class CreateChallengeGroupArgs {
  @Field()
  name: string;
}

@ArgsType()
export class InviteMemberArgs {
  @Field(() => Int)
  groupId: number;

  @Field()
  oauthId: string;
}

@ArgsType()
export class ChallengeIdArgs {
  @Field(() => Int)
  challengeId: number;
}

@ArgsType()
export class CreateChallengeArgs {
  @Field(() => Int)
  groupId: number;

  @Field()
  recipientOauthId: string;

  @Field(() => CreateChallengeInput)
  input: CreateChallengeInput;
}
