import { forwardRef, Module } from '@nestjs/common';
import { ProfilesConsumer } from './profiles.consumer';
import { ProfilesRepository } from './profiles.repository';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../database/database.module';
import { ProfilesResolver } from './profiles.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'user_created' }),
    forwardRef(() => AuthModule),
  ],
  providers: [ProfilesConsumer, ProfilesRepository, ProfilesResolver],
  exports: [],
})
export class ProfilesModule {}
