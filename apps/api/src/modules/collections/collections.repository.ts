import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { NewCollectionRequiredFields } from './collections.dto';
import { CollectionStatus } from '@prisma/client';

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
        collections: {
          where: {
            status: 'ACTIVE',
          },
        },
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

  async updateCollectionStatus(collectionId: number, status: CollectionStatus) {
    return this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        status,
      },
    });
  }

  async getCollectionById(collectionId: number) {
    return this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        gamesCollection: {
          select: {
            game: {
              include: {
                cover: {
                  select: {
                    bigUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
