import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GameStatus } from '@prisma/client';

@Injectable()
export class UsersActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerNewUserActivity({
    oauthId,
    activity,
    gameId,
  }: RegisterNewUserActivityArgs) {
    return this.prismaService.userActivity.create({
      data: {
        user: {
          connect: {
            oauthId,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
        activityType: activity,
      },
    });
  }
}

type RegisterNewUserActivityArgs = {
  oauthId: string;
  activity: GameStatus;
  gameId: number;
};
