import { Query } from '@nestjs/cqrs';

export class GetBacklogProgressQuery {
  constructor(
    public readonly year: number | null,
    public readonly oauthId: string,
  ) {}
}
