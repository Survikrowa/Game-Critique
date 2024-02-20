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

registerEnumType(GameStatus, {
  name: 'gameStatus',
  description: 'GameStatus Enum',
});
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
