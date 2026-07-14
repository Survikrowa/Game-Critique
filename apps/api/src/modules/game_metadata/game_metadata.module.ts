import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { PrismaGameMetadataRepository } from './infrastructure/adapters/prisma-game-metadata.repository';
import { DoesItPlayScraperService } from './infrastructure/adapters/does-it-play-scraper.service';
import { FetchDoesItPlayDataHandler } from './application/commands/fetch_does_it_play_data/fetch_does_it_play_data.handler';
import { GameMetadataResolver } from './infrastructure/graphql/game_metadata.resolver';
import { BackfillDoesItPlayHandler } from './application/handlers/backfill_does_it_play.handler';

const CommandHandlers = [FetchDoesItPlayDataHandler];
const EventHandlers = [BackfillDoesItPlayHandler];

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    PrismaGameMetadataRepository,
    DoesItPlayScraperService,
    GameMetadataResolver,
  ],
  exports: [CqrsModule],
})
export class GameMetadataModule {}
