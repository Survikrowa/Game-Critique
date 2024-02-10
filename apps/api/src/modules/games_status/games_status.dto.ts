import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { GameStatus } from '@prisma/client';
import { PlatformDTO } from '../platforms/platforms.dto';
import { GameWithCoversDTO } from '../games/games.dto';

registerEnumType(GameStatus, {
  name: 'GameStatus',
  description: 'GameStatus Enum',
});
@InputType({ description: 'GameStatus CompletedIn Arg' })
export class GameStatusCompletedInArgDTO {
  @Field(() => String, { nullable: true })
  hours?: string;
  @Field(() => String, { nullable: true })
  minutes?: string;
  @Field(() => String, { nullable: true })
  seconds?: string;
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

@InputType()
export class CreateGameStatusArgsDTO {
  @Field(() => GameStatusCompletedInArgDTO)
  completedIn: GameStatusCompletedInArgDTO;

  @Field(() => String, { nullable: true })
  score: string;

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
  @Field(() => GameWithCoversDTO)
  game: GameWithCoversDTO;
}
