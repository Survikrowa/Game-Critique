import { Query } from '@nestjs/cqrs';

export class GetLastEditedGamesQuery extends Query<
  GetLastEditedGamesQueryResponse[]
> {
  constructor(
    public readonly userId: string,
    public readonly limit: number = 5,
  ) {
    super();
  }
}

export type GetLastEditedGamesQueryResponse = {
  id: number;
  name: string;
  status: string;
  cover: {
    id: number;
    bigUrl: string;
    mediumUrl: string;
    smallUrl: string;
  } | null;
};
