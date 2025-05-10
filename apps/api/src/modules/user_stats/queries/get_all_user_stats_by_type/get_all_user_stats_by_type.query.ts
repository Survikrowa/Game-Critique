import { Query } from '@nestjs/cqrs';

export class GetAllUserStatsByTypeQuery extends Query<GetAllUserStatsByTypeQueryResponse> {
  constructor(
    public readonly type: string,
    public readonly oauthId: string,
  ) {
    super();
  }
}

export type GetAllUserStatsByTypeQueryResponse = {
  label: string;
  value: number;
}[];
