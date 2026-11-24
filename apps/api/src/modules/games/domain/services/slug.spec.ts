import { toSlug } from './slug';

describe('toSlug', () => {
  it('normalizes punctuation and spaces', () => {
    expect(toSlug('The Witcher 3: Wild Hunt')).toBe('the-witcher-3-wild-hunt');
  });

  it('removes diacritics', () => {
    expect(toSlug('Łódź')).toBe('lodz');
  });
});
