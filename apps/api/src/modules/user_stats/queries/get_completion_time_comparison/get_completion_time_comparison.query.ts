import { Query } from '@nestjs/cqrs';
import { CompletionTimeComparisonDTO } from '../../user_stats.dto';

export class GetCompletionTimeComparisonQuery extends Query<CompletionTimeComparisonDTO> {
  constructor(
    public readonly gameStatusId: number,
    public readonly oauthId: string,
  ) {
    super();
  }
}
