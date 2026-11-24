import { Query } from '@nestjs/cqrs';
import { HLTBComparisonDTO } from '../../user_stats.dto';

export class GetHLTBComparisonQuery extends Query<HLTBComparisonDTO> {
  constructor(
    public readonly gameStatusId: number,
    public readonly oauthId: string,
  ) {
    super();
  }
}
