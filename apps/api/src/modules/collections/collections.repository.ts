import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { NewCollectionRequiredFields } from './collections.dto';

@Injectable()
export class CollectionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewCollection({
    description,
    name,
    profileId,
  }: NewCollectionRequiredFields) {
    return this.prismaService.collection.create({
      data: {
        name,
        description,
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
    });
  }

  async getProfileCollections(oauthUserId: string) {
    return this.prismaService.profile.findFirst({
      where: {
        oauthId: oauthUserId,
      },
      select: {
        collections: true,
      },
    });
  }

  async countGamesInCollection(collectionId: number) {
    return this.prismaService.gamesCollection.count({
      where: {
        collectionId,
      },
    });
  }
}
