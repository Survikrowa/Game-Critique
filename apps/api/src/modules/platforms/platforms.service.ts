import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllPlatformsQuery } from './queries/get_all_platforms/get_all_platforms.query';

@Injectable()
export class PlatformsService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllPlatforms() {
    return this.queryBus.execute(new GetAllPlatformsQuery());
  }
}
