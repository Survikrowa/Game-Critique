import { forwardRef, Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { DatabaseModule } from '../database/database.module';
import { CollectionsResolver } from './collection.resolver';
import { CollectionsRepository } from './collections.repository';
import { CollectionsService } from './collections.service';

@Module({
  imports: [ProfilesModule, forwardRef(() => DatabaseModule)],
  providers: [CollectionsResolver, CollectionsRepository, CollectionsService],
})
export class CollectionsModule {}
