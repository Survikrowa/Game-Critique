import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSettingsObject {
  @Field(() => [Int])
  platformIds: number[];
}
