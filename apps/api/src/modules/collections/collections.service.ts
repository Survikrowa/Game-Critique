import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getCollectionById(collectionId: number) {
    const collection =
      await this.collectionsRepository.getCollectionById(collectionId);
    if (!collection) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Collection not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    const { gamesCollection, ...restCollection } = collection;
    return {
      ...restCollection,
      games: gamesCollection.map(({ game }) => ({
        name: game.name,
        id: game.id,
        slug: game.slug,
        hltbId: game.hltbId,
        bigUrl: game.cover?.bigUrl || '',
        cover: {
          id: game.cover?.id || 0,
          bigUrl: game.cover?.bigUrl || '',
          smallUrl: game.cover?.smallUrl || '',
          mediumUrl: game.cover?.mediumUrl || '',
        },
      })),
    };
  }

  async addGameToCollection(collectionId: number, hltbGameId: number) {
    return this.collectionsRepository.addGameToCollection(
      collectionId,
      hltbGameId,
    );
  }
}
