import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameReminderObject {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  igdbId: number;

  @Field()
  gameName: string;

  @Field()
  gameUrl: string;

  @Field()
  releaseDate: Date;

  @Field({ nullable: true })
  coverUrl?: string;

  @Field()
  createdAt: Date;
}
