import { Field, ObjectType } from '@nestjs/graphql';
import { GameWithCoversDTO } from '../../games/games.dto';
import { GameStatus } from '@prisma/client';

@ObjectType({ description: 'User activity' })
export class UserActivityDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  oauthId: string;
  @Field(() => GameWithCoversDTO, { nullable: true })
  game: GameWithCoversDTO | null;
  @Field(() => GameStatus)
  activityType: GameStatus;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => String, {
    description:
      "Formatted date of the activity update. Example: '2 dni temu' or 'wczoraj' etc.",
  })
  formattedUpdatedAt: string;
}
