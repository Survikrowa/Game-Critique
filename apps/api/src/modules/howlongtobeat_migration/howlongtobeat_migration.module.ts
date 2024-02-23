import { Module } from '@nestjs/common';
import { HowLongToBeatMigrationController } from './howlongtobeat_migration.controller';
import { HowLongToBeatMigrationService } from './howlongtobeat_migration.service';
import { BullModule } from '@nestjs/bull';
import { SearchModule } from '../search/search.module';
import { GamesModule } from '../games/games.module';
import { HowLongToBeatMigrationConsumer } from './howlongtobeat_migration.consumer';
import { GamesStatusModule } from '../games_status/games_status.module';
import { DatabaseModule } from '../database/database.module';
import { HowLongToBeatMigrationStatusModule } from './howlongtobeat_migration_status/howlongtobeat_migration_status.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'hltbMigration' }),
    SearchModule,
    GamesModule,
    GamesStatusModule,
    DatabaseModule,
    HowLongToBeatMigrationStatusModule,
  ],
  controllers: [HowLongToBeatMigrationController],
  providers: [HowLongToBeatMigrationService, HowLongToBeatMigrationConsumer],
  exports: [HowLongToBeatMigrationStatusModule],
})
export class HowLongToBeatMigrationModule {}
