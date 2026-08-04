import { Query } from '@nestjs/cqrs';
import { StreakDTO } from '../../user_stats.dto';

export class GetStreakQuery extends Query<StreakDTO> {
  constructor(public readonly oauthId: string) {
    super();
  }
}
