import { Query } from '@nestjs/cqrs';

export class GetUpcomingGamesQuery extends Query<GetUpcomingGamesQueryResponse> {
  constructor(public readonly limit: number) {
    super();
  }
}

export type GetUpcomingGamesQueryResponse = any;
