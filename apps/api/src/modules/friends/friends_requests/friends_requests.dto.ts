import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileInfoDTO } from '../../profiles/profiles.dto';

@ObjectType({ description: 'Friend request response' })
export class FriendRequestResponseDTO {
  @Field(() => String)
  receiverId: string;
}

@ObjectType({ description: 'Get Friend Requests response' })
export class GetFriendRequestsResponseDTO {
  @Field(() => String)
  senderOauthId: string;
  @Field(() => ProfileInfoDTO, { nullable: true })
  senderProfile: ProfileInfoDTO | null;
}
