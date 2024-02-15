import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('FriendSingleEntry')
export class FriendDTO {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  name?: string | null;
  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;
}

@ObjectType('FriendsList')
export class FriendsListDTO {
  @Field(() => [FriendDTO])
  friends: FriendDTO[];
}
