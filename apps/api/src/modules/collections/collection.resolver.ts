import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { CollectionDTO, NewCollectionDTO } from './collections.dto';
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
    const collections = await this.collectionsService.getProfileCollections(
      user.sub,
    );
    if (collections && collections.collections) {
      return collections.collections;
    }
    return [];
  }
}
