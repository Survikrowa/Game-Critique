import { GameStatus, RoleEnum } from '@prisma/client';

export type GetUserReturn = {
  id: number;
  oauthId: string;
  profile: {
    name: string | null;
    avatarUrl: string;
    id: number;
  } | null;
  role: {
    role: { name: RoleEnum };
  } | null;
  userActivity: {
    oauthId: string;
    activityType: GameStatus;
    id: number;
    game: {
      cover: {
        smallUrl: string;
        bigUrl: string;
        mediumUrl: string;
        id: number;
      } | null;
      id: number;
      name: string;
      slug: string;
      hltbId: number;
    };
    updatedAt: Date;
  }[];
  GamesStatus: {
    completedIn: {
      hours: number | null;
      minutes: number | null;
      seconds: number | null;
    } | null;
    gameId: number;
    score: string | null;
    achievementsCompleted: boolean;
    platformId: number;

    game: {
      id: number;
      name: string;
    };
    status: GameStatus;
  }[];
};
export type GetAllUsersWithProfileReturn = {
  id: number;
  oauthId: string;
  profile: {
    name: string | null;
    avatarUrl: string;
    id: number;
  } | null;
  role: {
    role: { name: RoleEnum };
  } | null;
};
