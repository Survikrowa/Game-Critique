import { ExternalGameKind } from '../models/external_game.model';

const MAIN_GAME = 0;
const EDITION_GAME_TYPES = new Set([8, 9, 10, 11, 12, 13]);
const DLC_GAME_TYPES = new Set([1, 2, 4, 6, 7]);
const UNKNOWN_GAME_TYPE = -1;

export const classifyGameKind = (input: {
  gameType: number | null;
  hasVersionParent: boolean;
  hasParentGame: boolean;
}): ExternalGameKind => {
  if (
    input.gameType === MAIN_GAME &&
    !input.hasVersionParent &&
    !input.hasParentGame
  ) {
    return 'base';
  }
  if (
    input.hasVersionParent ||
    EDITION_GAME_TYPES.has(input.gameType ?? UNKNOWN_GAME_TYPE)
  ) {
    return 'edition';
  }
  if (
    input.hasParentGame ||
    DLC_GAME_TYPES.has(input.gameType ?? UNKNOWN_GAME_TYPE)
  ) {
    return 'dlc';
  }
  return 'other';
};
