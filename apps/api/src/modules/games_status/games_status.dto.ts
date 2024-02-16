import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { GameStatus } from '@prisma/client';
import { PlatformDTO } from '../platforms/platforms.dto';
import { GameWithAllDataDTO } from '../games/games.dto';

registerEnumType(GameStatus, {
  name: 'gameStatus',
  description: 'GameStatus Enum',
});
@ObjectType({ description: 'GameStatus CompletedIn Arg' })
export class GameStatusCompletedInArgDTO {
  @Field(() => Number, { nullable: true })
  hours: number | null;
  @Field(() => Number, { nullable: true })
  minutes: number | null;
  @Field(() => Number, { nullable: true })
  seconds: number | null;
}

@ObjectType({ description: 'GameStatus' })
export class GameStatusDTO {
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

@InputType()
export class UpsertGameStatusArgsDTO extends GameStatusDTO {
  @Field(() => Boolean)
  isEditing: boolean;
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
