import { Query } from '@nestjs/cqrs';

export class GetBacklogProgressQuery {
  constructor(
    public readonly year: number,
    public readonly oauthId: string,
  ) {}
}
