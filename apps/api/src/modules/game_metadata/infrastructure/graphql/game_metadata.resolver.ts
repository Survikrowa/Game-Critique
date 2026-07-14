import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/auth-jwt.guard';
import { FetchDoesItPlayDataCommand } from '../../application/commands/fetch_does_it_play_data/fetch_does_it_play_data.command';
import { PrismaService } from '../../../database/prisma.service';

@Resolver()
export class GameMetadataResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async fetchDoesItPlayData(@Args('hltbId') hltbId: number): Promise<boolean> {
    const game = await this.prisma.game.findUnique({ where: { hltbId } });
    if (!game) return false;
    return this.commandBus.execute(
      new FetchDoesItPlayDataCommand(hltbId, game.name),
    );
  }
}
