import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Single Game Release(Year) Date' })
export class GameReleaseDTO {
  @Field(() => Number)
  id: number;
  @Field(() => Number, { nullable: true })
  date: number | null;
}
