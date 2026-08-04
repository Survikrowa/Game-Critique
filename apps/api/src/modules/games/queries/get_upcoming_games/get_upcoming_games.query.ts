import { Query } from '@nestjs/cqrs';
import { ExternalGameDTO } from '../../games.dto';

export class GetUpcomingGamesQuery extends Query<ExternalGameDTO[]> {
  constructor(
    public readonly limit: number,
    public readonly oauthId?: string,
  ) {
    super();
  }
}
