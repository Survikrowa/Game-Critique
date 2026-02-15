export type DoesItPlayGameInfo = {
  hasPhysicalRelease: boolean;
  hasGameOnDisc: boolean;
};

export type DoesItPlaySearchResult = {
  hasPhysicalRelease: boolean;
  hasGameOnDisc: boolean;
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
