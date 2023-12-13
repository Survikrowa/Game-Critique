import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Cover {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;
}

@ObjectType()
class Genre {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  igdbId: number;
}

@ObjectType()
class Platform {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  igdbId: number;

  @Field()
  slug: string;
}

@ObjectType()
export class IgdbGame {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Cover)
  cover: Cover;

  @Field({ nullable: true })
  first_release_date: number;

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];

  @Field(() => [Platform], { nullable: true })
  platforms: Platform[];

  @Field()
  slug: string;

  @Field()
  url: string;
}
