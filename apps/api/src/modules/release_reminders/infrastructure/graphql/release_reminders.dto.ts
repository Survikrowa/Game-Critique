import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddReminderInput {
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
}
