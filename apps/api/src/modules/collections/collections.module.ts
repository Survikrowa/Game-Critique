import { forwardRef, Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { DatabaseModule } from '../database/database.module';
import { CollectionsResolver } from './collection.resolver';
import { CollectionsRepository } from './collections.repository';
import { CollectionsService } from './collections.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ProfilesModule, forwardRef(() => DatabaseModule), AuthModule],
  providers: [CollectionsResolver, CollectionsRepository, CollectionsService],
})
export class CollectionsModule {}
