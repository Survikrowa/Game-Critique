import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllUserStatsByTypeQuery } from './queries/get_all_user_stats_by_type/get_all_user_stats_by_type.query';

@Injectable()
export class UserStatsService {
  constructor(private readonly queryBus: QueryBus) {}
  async getUserStats({ type, oauthId }: GetUserStatsArgs) {
    return this.queryBus.execute(new GetAllUserStatsByTypeQuery(type, oauthId));
  }
}

type GetUserStatsArgs = {
  type: string;
  oauthId: string;
};
