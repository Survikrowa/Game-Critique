import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

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
