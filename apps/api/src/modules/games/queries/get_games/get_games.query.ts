import { Query } from '@nestjs/cqrs';

export class GetGamesQuery extends Query<GetGamesQueryResponse[]> {
  constructor(
    public readonly search: string | null,
    public readonly take: number | undefined,
    public readonly skip: number | undefined,
  ) {
    super();
  }
}

export type GetGamesQueryResponse = {
  id: number;
  name: string;
  slug: string;
  hltbId: number;
};
