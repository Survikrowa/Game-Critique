import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { FetchDoesItPlayDataCommand } from '../../application/commands/fetch_does_it_play_data/fetch_does_it_play_data.command';

@Resolver()
export class GameMetadataResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async fetchDoesItPlayData(
    @Args('gameId', { type: () => Int }) gameId: number,
  ): Promise<boolean> {
    return this.commandBus.execute(new FetchDoesItPlayDataCommand(gameId));
  }
}
