import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SettingsResolver } from './infrastructure/graphql/settings.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [SettingsResolver],
})
export class SettingsModule {}
