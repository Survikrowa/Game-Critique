import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import {
  AddGameToCollectionDTO,
  CollectionDTO,
  CollectionMutationResponseDTO,
  CollectionWithGamesDTO,
  NewCollectionDTO,
  RemoveCollectionArgsDTO,
  RemovedCollectionResponseDTO,
} from './collections.dto';
import { UserDTO } from '../auth/auth.dto';
import { User } from '../auth/auth.decorators';
import { ProfilesService } from '../profiles/profiles.service';
import { CollectionsService } from './collections.service';

@Resolver()
export class CollectionsResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly collectionsService: CollectionsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CollectionDTO)
  async createNewCollection(
    @User() user: UserDTO,
    @Args('collection') collection: NewCollectionDTO,
  ) {
    const profile = await this.profilesService.getProfileInfo(user.sub);
    if (!profile) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Profile not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.collectionsService.createNewCollection({
      name: collection.name,
      description: collection.description,
      profileId: profile.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CollectionDTO])
  async getProfileCollections(@User() user: UserDTO) {
    return this.collectionsService.getProfileCollections(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RemovedCollectionResponseDTO)
  async removeCollection(
    @Args('collection') collection: RemoveCollectionArgsDTO,
  ) {
    const updatedCollection =
      await this.collectionsService.updateUserCollectionStatus(
        collection.collectionId,
        'REMOVED',
      );
    if (updatedCollection) {
      return {
        success: true,
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: 'Collection not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => CollectionWithGamesDTO, { name: 'collection' })
  async getCollectionById(
    @Args('id') id: number,
  ): Promise<CollectionWithGamesDTO> {
    return this.collectionsService.getCollectionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CollectionMutationResponseDTO)
  async addGameToCollection(
    @Args('collection') collection: AddGameToCollectionDTO,
  ) {
    try {
      await this.collectionsService.addGameToCollection(
        collection.collectionId,
        collection.hltbGameId,
      );
      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  }
}
