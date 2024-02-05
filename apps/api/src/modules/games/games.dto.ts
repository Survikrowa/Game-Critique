import { Field, ObjectType } from '@nestjs/graphql';
import { CoverDTO } from '../covers/covers.dto';
import { PlatformDTO } from '../platforms/platforms.dto';
import { GameReleaseDTO } from '../game_releases/game_releases.dto';
import { GenresDto } from '../genres/genres.dto';

@ObjectType({ description: 'Single Game' })
export class GameDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  hltbId: string;
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
  @Field(() => CoverDTO)
  covers: CoverDTO;
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
  covers: CoverDTO | null;
  @Field(() => [PlatformDTO])
  platforms: PlatformDTO[];
  @Field(() => GameReleaseDTO, { nullable: true })
  releases: GameReleaseDTO | null;
  @Field(() => [GenresDto])
  genres: GenresDto[];
}
