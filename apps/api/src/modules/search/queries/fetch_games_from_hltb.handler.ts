import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchGamesFromHltbQuery } from './fetch_games_from_hltb.query';
import { HowLongToBeatParserFacade } from '../../howlongtobeat_parser/howlongtobeat_parser.facade';

@QueryHandler(FetchGamesFromHltbQuery)
export class FetchGamesFromHltbQueryHandler
  implements IQueryHandler<FetchGamesFromHltbQuery>
{
  constructor(private readonly hltbParserFacade: HowLongToBeatParserFacade) {}

  async execute(query: FetchGamesFromHltbQuery) {
    const { input } = query;
    return this.hltbParserFacade.fetchGames(input);
  }
}
