import { Field, ObjectType } from '@nestjs/graphql';
import { UserActivityDTO } from '../../users/users_activity/users_activity.dto';

@ObjectType()
class User {
  @Field(() => String, { nullable: true })
  name?: string | null;
  @Field(() => String)
  oauthId: string;
  @Field(() => [UserActivityDTO])
  activity: UserActivityDTO[];
}

@ObjectType({ description: 'Users friends activity DTO' })
export class FriendsActivityDTO {
  @Field(() => User)
  user: User;
}
