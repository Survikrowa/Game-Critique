import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileInfoDTO } from '../profiles/profiles.dto';

@ObjectType({ description: 'User' })
export class UserDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  oauthId: string;

  @Field(() => ProfileInfoDTO, { nullable: true })
  profile: ProfileInfoDTO | null;
  @Field(() => Boolean)
  isFriendRequestSent: boolean;
}
