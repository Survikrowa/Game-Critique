import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Search result' })
export class SearchResult {
  @Field(() => [SearchGamesResult])
  games: SearchGamesResult[];
}

@ObjectType()
export class Cover {
  @Field()
  small_url: string;

  @Field()
  big_url: string;

  @Field()
  medium_url: string;
}

@ObjectType({ description: 'Search Games Result' })
export class SearchGamesResult {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => Cover)
  cover: Cover;
}
