import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoverDTO } from '../covers/covers.dto';
import { PlatformDTO } from '../platforms/platforms.dto';
import { GameReleaseDTO } from '../game_releases/game_releases.dto';
import { GenresDto } from '../genres/genres.dto';
import { PaginationDTO } from '../pagination/pagination.dto';
import { PaginationArgs } from '../pagination/pagination.args';
import { GameStatus } from '@prisma/client';

@ObjectType({ description: 'Single Game' })
export class GameDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => Number)
  hltbId: number;
}

@ObjectType({ description: 'Single Game with covers' })
export class GameWithCoversDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => Number)
  hltbId: number;
  @Field(() => CoverDTO, { nullable: true })
  cover?: CoverDTO | null;
}

@ObjectType({ description: 'GameCompletionTime' })
export class GameCompletionTimeDTO {
  @Field(() => Number)
  main: number;
  @Field(() => Number)
  mainExtra: number;
  @Field(() => Number)
  completionist: number;
}

@ObjectType({ description: 'Game with all linked data' })
export class GameWithAllDataDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => Number)
  hltbId: number;
  @Field(() => CoverDTO, { nullable: true })
  cover: CoverDTO | null;
  @Field(() => [PlatformDTO])
  platforms: PlatformDTO[];
  @Field(() => GameReleaseDTO, { nullable: true })
  releases: GameReleaseDTO | null;
  @Field(() => [GenresDto])
  genres: GenresDto[];
  @Field(() => GameCompletionTimeDTO, { nullable: true })
  completionTime: GameCompletionTimeDTO | null;
}

@ObjectType('PaginatedGames')
export class PaginatedGamesDTO {
  @Field(() => [GameWithAllDataDTO])
  items: GameDTO[];
  @Field(() => PaginationDTO)
  pagination: PaginationDTO;
}

@ArgsType()
export class GetPaginatedGamesArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  search: string | null;
}

@ObjectType('UpdateGameDataDTO')
export class UpdateGameDataDTO {
  @Field(() => Number)
  hltbId: number;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class ExternalGamePlatformDTO {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class ExternalGameDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  coverUrl?: string;

  @Field({ nullable: true })
  backgroundUrl?: string; // Np. screenshot

  @Field()
  releaseDate: Date;

  @Field(() => [ExternalGamePlatformDTO])
  platforms: ExternalGamePlatformDTO[];
}
