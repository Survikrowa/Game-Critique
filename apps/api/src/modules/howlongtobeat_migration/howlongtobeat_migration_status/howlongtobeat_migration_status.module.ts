import { Module } from '@nestjs/common';
import { HowLongToBeatMigrationStatusResolver } from './howlongtobeat_migration_status.resolver';
import { DatabaseModule } from '../../database/database.module';
import { HowLongToBeatMigrationStatusService } from './howlongtobeat_migration_status.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    HowLongToBeatMigrationStatusResolver,
    HowLongToBeatMigrationStatusService,
  ],
  exports: [HowLongToBeatMigrationStatusService],
})
export class HowLongToBeatMigrationStatusModule {}
