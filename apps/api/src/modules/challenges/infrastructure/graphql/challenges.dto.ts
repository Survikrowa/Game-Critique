import { Field, InputType } from '@nestjs/graphql';
import { ChallengeType } from '@prisma/client';

@InputType()
export class CreateChallengeInput {
  @Field(() => ChallengeType)
  type: ChallengeType;

  @Field()
  gameId: number;

  @Field({ nullable: true })
  description?: string;
}
