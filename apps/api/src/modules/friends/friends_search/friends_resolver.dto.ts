import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';

registerEnumType(RoleEnum, {
  name: 'Role',
  description: 'Role Enum',
});

@ObjectType({ description: 'User Search Result' })
export class UserSearchResultDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  oauthId: string;

  @Field(() => ProfileDTO, { nullable: true })
  profile: ProfileDTO | null;

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum;

  @Field(() => Boolean)
  isFriendRequestSent: boolean;
}

@ObjectType({ description: 'User profile info' })
export class ProfileDTO {
  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { description: "User's avatar URL from Cloudinary" })
  avatarUrl: string;

  @Field(() => Number)
  id: number;
}
