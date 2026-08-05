import { ArgsType, Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FriendYearlySummaryDTO {
  @Field(() => Int)
  totalGames: number;

  @Field(() => Float)
  totalHours: number;

  @Field(() => Float, { nullable: true })
  averageScore: number | null;

  @Field(() => Int)
  completedThisYear: number;

  @Field(() => Int)
  backlogAddedThisYear: number;

  @Field(() => Int)
  yearlyGames: number;

  @Field(() => Float)
  yearlyHours: number;

  @Field(() => Float, { nullable: true })
  yearlyAverageScore: number | null;
}

@ObjectType()
export class FriendMonthlyActivityDTO {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  gamesCompleted: number;

  @Field(() => Float)
  hoursPlayed: number;
}

@ObjectType()
export class FriendBacklogProgressDTO {
  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  added: number;

  @Field(() => Float)
  ratio: number;
}

@ObjectType()
export class FriendStreakDTO {
  @Field(() => Int)
  currentStreak: number;

  @Field(() => Int)
  longestStreak: number;
}

@ArgsType()
export class GetFriendYearlySummaryArgs {
  @Field(() => String)
  oauthId: string;

  @Field(() => Int, { nullable: true })
  year?: number | null;
}

@ArgsType()
export class GetFriendMonthlyActivityArgs {
  @Field(() => String)
  oauthId: string;

  @Field(() => Int, { nullable: true })
  year?: number | null;
}

@ArgsType()
export class GetFriendStreakArgs {
  @Field(() => String)
  oauthId: string;
}

@ArgsType()
export class GetFriendBacklogProgressArgs {
  @Field(() => String)
  oauthId: string;

  @Field(() => Int, { nullable: true })
  year?: number | null;
}
