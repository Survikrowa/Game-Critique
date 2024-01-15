import { forwardRef, Module } from '@nestjs/common';
import { ProfilesConsumer } from './profiles.consumer';
import { ProfilesRepository } from './profiles.repository';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'user_created' }),
  ],
  providers: [ProfilesConsumer, ProfilesRepository],
  exports: [],
})
export class ProfilesModule {}
