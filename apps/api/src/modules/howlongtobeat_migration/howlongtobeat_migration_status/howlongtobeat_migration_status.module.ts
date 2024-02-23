import { Module } from '@nestjs/common';
import { HowLongToBeatMigrationStatusResolver } from './howlongtobeat_migration_status.resolver';
import { DatabaseModule } from '../../database/database.module';
import { HowLongToBeatMigrationStatusService } from './howlongtobeat_migration_status.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    HowLongToBeatMigrationStatusResolver,
    HowLongToBeatMigrationStatusService,
  ],
  exports: [HowLongToBeatMigrationStatusService],
})
export class HowLongToBeatMigrationStatusModule {}
