import {
  getWeekAgoDate,
  getWeekNumber,
  pluralizePolish,
} from './weekly_summary.handler';

describe('weekly summary utilities', () => {
  describe('getWeekAgoDate', () => {
    it('returns a date 7 days in the past', () => {
      const before = Date.now();
      const result = getWeekAgoDate();
      const after = Date.now();

      const diffMs = before - result.getTime();
      const expectedMs = 7 * 24 * 60 * 60 * 1000;

      expect(diffMs).toBeCloseTo(expectedMs, -2);
    });
  });

  describe('getWeekNumber', () => {
    it('returns 1 for the first week of 2024', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      expect(getWeekNumber(date)).toBe(1);
    });

    it('returns 52 for late December 2023', () => {
      const date = new Date('2023-12-28T12:00:00Z');
      expect(getWeekNumber(date)).toBe(52);
    });
  });

  describe('pluralizePolish', () => {
    it('returns singular form for count 1', () => {
      expect(
        pluralizePolish(
          1,
          'gra ukończona',
          'gry ukończone',
          'gier ukończonych',
        ),
      ).toBe('gra ukończona');
    });

    it('returns plural few form for count 2-4', () => {
      expect(
        pluralizePolish(
          2,
          'gra ukończona',
          'gry ukończone',
          'gier ukończonych',
        ),
      ).toBe('gry ukończone');
    });

    it('returns plural many form for count 5+', () => {
      expect(
        pluralizePolish(
          5,
          'gra ukończona',
          'gry ukończone',
          'gier ukończonych',
        ),
      ).toBe('gier ukończonych');
    });
  });
});
