import { Field, ObjectType } from '@nestjs/graphql';
import { IgdbGame } from '../igdb/models/igdb_game.model';

@ObjectType({ description: 'Search result' })
export class SearchResult {
  @Field(() => [IgdbGame])
  games: IgdbGame[];
}
