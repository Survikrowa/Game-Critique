import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SettingsResolver } from './infrastructure/graphql/settings.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [SettingsResolver],
})
export class SettingsModule {}
