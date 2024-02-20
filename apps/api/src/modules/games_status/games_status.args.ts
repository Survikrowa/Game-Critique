import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../pagination/pagination.args';
import { GameStatus } from '@prisma/client';

@ArgsType()
export class GetAllUserGamesStatusArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  oauthId: string | null;

  @Field(() => GameStatus)
  status: GameStatus;
}
