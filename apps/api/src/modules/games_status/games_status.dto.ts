import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { GameStatus } from '@prisma/client';
import { PlatformDTO } from '../platforms/platforms.dto';
import { GameWithAllDataDTO } from '../games/games.dto';
import { PaginationDTO } from '../pagination/pagination.dto';
import { ProfileInfoDTO } from '../profiles/profiles.dto';
import { CoverDTO } from '../covers/covers.dto';

registerEnumType(GameStatus, {
  name: 'gameStatus',
  description: 'GameStatus Enum',
});

@ObjectType({ description: 'GameStatus Progress State' })
export class GameStatusProgressState {
  @Field(() => String)
  label: string;
  @Field(() => GameStatus)
  value: GameStatus;
}

@ObjectType({ description: 'GameStatus Progress State DTO' })
export class GameStatusProgressStateDTO {
  @Field(() => [GameStatusProgressState])
  gameStatusProgressState: GameStatusProgressState[];
}

@ObjectType({ description: 'GameStatus Sort Options' })
export class SortOptions {
  @Field(() => String)
  id: string;
  @Field(() => String)
  field: string;
  @Field(() => String)
  order: string;
  @Field(() => String)
  label: string;
}

@ObjectType({ description: 'All possible sort options for games status' })
export class SortOptionsDTO {
  @Field(() => [SortOptions])
  sortOptions: SortOptions[];
}

@InputType({ description: 'GameStatus CompletedIn Arg' })
export class GameStatusCompletedInArgDTO {
  @Field(() => String, { nullable: true })
  hours: string | null;
  @Field(() => String, { nullable: true })
  minutes: string | null;
  @Field(() => String, { nullable: true })
  seconds: string | null;
}

@ObjectType({ description: 'GameStatus' })
export class GameStatusDTO {
  @Field(() => GameStatusCompletedInDTO, { nullable: true })
  completedIn: GameStatusCompletedInDTO | null;

  @Field(() => String, { nullable: true })
  score: string | null;

  @Field(() => Number)
  platformId: number;

  @Field(() => GameStatus)
  gameStatus: GameStatus;

  @Field(() => Number)
  gameId: number;

  @Field(() => Boolean)
  achievementsCompleted: boolean;

  @Field(() => Number, { nullable: true })
  gamesStatusId?: number;
}

@InputType()
export class UpsertGameStatusArgsDTO {
  @Field(() => Boolean)
  isEditing: boolean;
  @Field(() => GameStatusCompletedInArgDTO, { nullable: true })
  completedIn: GameStatusCompletedInArgDTO | null;

  @Field(() => String, { nullable: true })
  score: string | null;

  @Field(() => Number)
  platformId: number;

  @Field(() => GameStatus)
  gameStatus: GameStatus;

  @Field(() => Number)
  gameId: number;

  @Field(() => Boolean)
  achievementsCompleted: boolean;

  @Field(() => String, { nullable: true })
  review: string | null;

  @Field(() => Number, { nullable: true })
  gamesStatusId?: number;
}

@ObjectType({ description: 'GameStatus Success Response' })
export class GameStatusSuccessResponseDTO {
  @Field(() => String)
  message: string;
}

@ObjectType({ description: 'GameStatus Error Response' })
export class GameStatusErrorResponseDTO {
  @Field(() => String)
  error: string;
}

@ObjectType({ description: 'GameStatus Removed Response' })
export class GameStatusRemovedResponseDTO {
  @Field(() => String)
  message: string;
}

@ObjectType({ description: 'GameStatus CompletedIn' })
export class GameStatusCompletedInDTO {
  @Field(() => Number, { nullable: true })
  hours: number | null;
  @Field(() => Number, { nullable: true })
  minutes: number | null;
  @Field(() => Number, { nullable: true })
  seconds: number | null;
}

@ObjectType({ description: 'UserGamesStatus Response' })
export class UserGamesStatusResponseDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String, { nullable: true })
  score: string | null;
  @Field(() => PlatformDTO)
  platform: PlatformDTO;
  @Field(() => GameStatus)
  status: GameStatus;
  @Field(() => Boolean)
  achievementsCompleted: boolean;
  @Field(() => GameStatusCompletedInDTO, { nullable: true })
  completedIn: GameStatusCompletedInDTO | null;
  @Field(() => String, { nullable: true })
  review: string | null;
  @Field(() => GameWithAllDataDTO)
  game: GameWithAllDataDTO;
}

@ObjectType({ description: 'UserGamesStatus Response with pagination' })
export class UserGamesStatusResponseWithPaginationDTO {
  @Field(() => [UserGamesStatusResponseDTO])
  userGamesStatus: UserGamesStatusResponseDTO[];
  @Field(() => PaginationDTO)
  pagination: PaginationDTO;
}

@ObjectType({ description: 'UserFriendGamesStatus Response with pagination' })
export class UserFriendGamesStatusResponseWithPaginationDTO {
  @Field(() => [UserGamesStatusResponseDTO])
  userGamesStatus: UserGamesStatusResponseDTO[];
  @Field(() => PaginationDTO)
  pagination: PaginationDTO;
}

@ObjectType({ description: 'UserGameStatus Response' })
export class UserGameStatusResponseDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String, { nullable: true })
  score: string | null;
  @Field(() => PlatformDTO)
  platform: PlatformDTO;
  @Field(() => GameStatus)
  status: GameStatus;
  @Field(() => Boolean)
  achievementsCompleted: boolean;
  @Field(() => GameStatusCompletedInDTO, { nullable: true })
  completedIn: GameStatusCompletedInDTO | null;
  @Field(() => String, { nullable: true })
  review: string | null;
  @Field(() => GameWithAllDataDTO)
  game: GameWithAllDataDTO;
}

@ObjectType({})
export class FriendsGameStatusReviewsDTO {
  @Field(() => ProfileInfoDTO, { nullable: true })
  profile: ProfileInfoDTO | null;
  @Field(() => String, { nullable: true })
  review: string | null;
  @Field(() => String, { nullable: true })
  score: string | null;
}

@ObjectType({ description: 'User last edited games statuses' })
export class LastEditedGamesStatusDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => CoverDTO, { nullable: true })
  cover: CoverDTO | null;
  @Field(() => GameStatus)
  status: GameStatus;
}
