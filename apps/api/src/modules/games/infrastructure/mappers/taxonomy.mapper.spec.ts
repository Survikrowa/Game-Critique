import { toLocalGenreSlug, toLocalPlatformSlug } from './taxonomy.mapper';

describe('taxonomy mapper', () => {
  it('maps IGDB PC name to local pc slug', () => {
    expect(toLocalPlatformSlug('PC (Microsoft Windows)')).toBe('pc');
  });

  it('maps IGDB PlayStation 5 to local slug', () => {
    expect(toLocalPlatformSlug('PlayStation 5')).toBe('playstation-5');
  });

  it('maps IGDB RPG genre to local slug', () => {
    expect(toLocalGenreSlug('Role-playing (RPG)')).toBe('role-playing');
  });

  it('falls back to normalized slug', () => {
    expect(toLocalGenreSlug('Something New')).toBe('something-new');
  });
});
