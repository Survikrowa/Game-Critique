import { Injectable } from '@nestjs/common';
import { CollectionsRepository } from './collections.repository';
import { NewCollectionRequiredFields } from './collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async createNewCollection({
    description,
    name,
    profileId,
  }: NewCollectionRequiredFields) {
    return this.collectionsRepository.createNewCollection({
      description,
      name,
      profileId,
    });
  }

  async getProfileCollections(oauthUserId: string) {
    return this.collectionsRepository.getProfileCollections(oauthUserId);
  }
}
