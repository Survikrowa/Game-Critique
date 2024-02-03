import { Injectable } from '@nestjs/common';
import { CollectionsRepository } from './collections.repository';
import { NewCollectionRequiredFields } from './collections.dto';
import { CollectionStatus } from '@prisma/client';

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
    const collections =
      await this.collectionsRepository.getProfileCollections(oauthUserId);
    if (!collections) {
      return [];
    }
    return Promise.all(
      collections.collections.map(async (collection) => {
        const countOfGames =
          await this.collectionsRepository.countGamesInCollection(
            collection.id,
          );
        return {
          ...collection,
          counter: countOfGames,
        };
      }),
    );
  }

  async updateUserCollectionStatus(
    collectionId: number,
    status: CollectionStatus,
  ) {
    return this.collectionsRepository.updateCollectionStatus(
      collectionId,
      status,
    );
  }
}
