import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PrismaGameMetadataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMetadataByGameId(gameId: number) {
    return this.prisma.game_metadata.findUnique({
      where: { game_id: gameId },
      include: {
        games_physical_media: true,
      },
    });
  }
}
