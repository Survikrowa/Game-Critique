import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllPlatformsQuery } from './queries/get_all_platforms/get_all_platforms.query';
import { UpdatePlatformCommand } from './commands/update_platform/update_platform.command';

@Injectable()
export class PlatformsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllPlatforms() {
    return this.queryBus.execute(new GetAllPlatformsQuery());
  }

  async updatePlatformDisplayName(platformId: number, displayName: string) {
    return this.commandBus.execute(
      new UpdatePlatformCommand({ id: platformId, displayName }),
    );
  }
}
