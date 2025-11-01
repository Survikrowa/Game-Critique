export type DoesItPlayGameInfo = {
  gameId: string;
  gameName: string;
  gameUrl: string;
  steamDeckVerification?: SteamDeckVerification;
  compatibility?: CompatibilityInfo;
};

export enum SteamDeckVerification {
  VERIFIED = 'verified',
  PLAYABLE = 'playable',
  UNSUPPORTED = 'unsupported',
  UNKNOWN = 'unknown',
}

export type CompatibilityInfo = {
  status: string;
  details: string[];
  notes?: string;
};

export type DoesItPlaySearchResult = {
  gameId: string;
  gameName: string;
  gameUrl: string;
  steamDeckStatus?: SteamDeckVerification;
  platformCompatibility?: {
    [platform: string]: string;
  };
};

export type DoesItPlayApiSearchResult = {
  title: string;
  platform: string;
  platformCode: string;
  testedOn: string | null;
  region: string | null;
  additionnalInfo: string | null;
  cover: string;
  url: string;
};
