import { toSlug } from '../../domain/services/slug';

const PLATFORM_ALIASES: Record<string, string> = {
  'pc (microsoft windows)': 'pc',
  pc: 'pc',
  'playstation 5': 'playstation-5',
  'playstation 4': 'playstation-4',
  'xbox series x|s': 'xbox-series-x',
  'xbox one': 'xbox-one',
  'nintendo switch': 'nintendo-switch',
  mac: 'mac',
  macos: 'mac',
  linux: 'linux',
  ios: 'ios',
  android: 'android',
};

const GENRE_ALIASES: Record<string, string> = {
  'role-playing (rpg)': 'role-playing',
  'role-playing': 'role-playing',
  sport: 'sports',
  sports: 'sports',
  'point-and-click': 'point-and-click',
  "hack and slash/beat 'em up": 'hack-and-slash',
  'real time strategy (rts)': 'real-time-strategy',
  'turn-based strategy (tbs)': 'turn-based-strategy',
  'card & board game': 'card-and-board-game',
};

const resolve = (value: string, aliases: Record<string, string>): string =>
  aliases[value.trim().toLowerCase()] ?? toSlug(value);

export const toLocalPlatformSlug = (value: string): string =>
  resolve(value, PLATFORM_ALIASES);

export const toLocalGenreSlug = (value: string): string =>
  resolve(value, GENRE_ALIASES);
