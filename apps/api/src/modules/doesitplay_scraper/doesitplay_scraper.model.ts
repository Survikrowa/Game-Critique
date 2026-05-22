import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DoesItPlayApiGame {
  @Field()
  title: string;

  @Field()
  platform: string;

  @Field()
  platformCode: string;

  @Field({ nullable: true })
  testedOn?: string;

  @Field({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  additionnalInfo?: string;

  @Field()
  cover: string;

  @Field()
  url: string;
}

@ObjectType()
export class DoesItPlaySearchResult {
  @Field(() => [DoesItPlayApiGame])
  games: DoesItPlayApiGame[];
}
