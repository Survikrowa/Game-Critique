import { ArgsType, Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class GetUserStatsArgs {
  @Field(() => String)
  type: string;
}

@ObjectType()
export class UserStatsDTO {
  @Field(() => String)
  label: string;

  @Field(() => Number)
  value: number;
}

@ObjectType()
export class YearlySummaryDTO {
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
}

@ObjectType()
export class MonthlyActivityDTO {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  gamesCompleted: number;

  @Field(() => Float)
  hoursPlayed: number;
}

@ObjectType()
export class BacklogProgressDTO {
  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  added: number;

  @Field(() => Float)
  ratio: number;
}

@ObjectType()
export class StreakDTO {
  @Field(() => Int)
  currentStreak: number;

  @Field(() => Int)
  longestStreak: number;
}

@ObjectType()
export class HLTBComparisonDTO {
  @Field(() => Int, { nullable: true })
  myHours: number | null;

  @Field(() => Int, { nullable: true })
  myMinutes: number | null;

  @Field(() => Int, { nullable: true })
  mainStoryHours: number | null;

  @Field(() => Int, { nullable: true })
  completionistHours: number | null;
}

@ArgsType()
export class GetYearlySummaryArgs {
  @Field(() => Int)
  year: number;
}

@ArgsType()
export class GetMonthlyActivityArgs {
  @Field(() => Int)
  year: number;
}

@ArgsType()
export class GetBacklogProgressArgs {
  @Field(() => Int)
  year: number;
}

@ArgsType()
export class GetHLTBComparisonArgs {
  @Field(() => Int)
  gameStatusId: number;
}
