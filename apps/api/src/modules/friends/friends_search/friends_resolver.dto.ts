import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from '../../users/users.dto';

@ObjectType({ description: 'User Search Result' })
export class UserSearchResultDTO extends UserDTO {
  @Field(() => Boolean)
  isFriendRequestSent: boolean;
}
