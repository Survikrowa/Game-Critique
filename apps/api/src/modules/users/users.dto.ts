import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProfileInfoDTO } from '../profiles/profiles.dto';
import { GameStatusDTO } from '../games_status/games_status.dto';
import { GameStatus } from '@prisma/client';
import { UserActivityDTO } from './users_activity/users_activity.dto';

registerEnumType(GameStatus, {
  name: 'GameStatus',
  description: 'GameStatus Enum',
});

@ObjectType({ description: 'User' })
export class UserDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  oauthId: string;

  @Field(() => ProfileInfoDTO, { nullable: true })
  profile: ProfileInfoDTO | null;
}

@ObjectType({ description: 'User i dont know how to name it' })
export class UserDataDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  oauthId: string;

  @Field(() => ProfileInfoDTO, { nullable: true })
  profile: ProfileInfoDTO | null;

  @Field(() => [GameStatusDTO], { nullable: true })
  gamesStatus: GameStatusDTO[] | null;

  @Field(() => [UserActivityDTO], { nullable: true })
  userActivity: UserActivityDTO[] | null;
}
