import { Query } from '@nestjs/cqrs';
import { YearlySummaryDTO } from '../../user_stats.dto';

export class GetYearlySummaryQuery extends Query<YearlySummaryDTO> {
  constructor(
    public readonly year: number | null,
    public readonly oauthId: string,
  ) {
    super();
  }
}
