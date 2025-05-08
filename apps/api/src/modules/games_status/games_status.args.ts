import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from '../pagination/pagination.args';
import { GameStatus } from '@prisma/client';

@InputType()
class FiltersGameStatus {
  @Field(() => String)
  platform: string;
}

@InputType({ description: 'GameStatus Sort Options' })
class SortOptionsArg {
  @Field(() => String)
  field: string;
  @Field(() => String)
  order: string;
}

@ArgsType()
export class GetAllUserGamesStatusArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  oauthId: string | null;

  @Field(() => GameStatus)
  status: GameStatus;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => FiltersGameStatus, { nullable: true })
  filters: FiltersGameStatus | null;

  @Field(() => SortOptionsArg)
  sort: SortOptionsArg;
}
