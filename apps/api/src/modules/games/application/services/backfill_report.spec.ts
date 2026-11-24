import { formatBackfillReport } from './backfill_report';

describe('formatBackfillReport', () => {
  it('lists unmatched games grouped by reason', () => {
    const output = formatBackfillReport({
      total: 3,
      matched: 1,
      unmatched: [
        { id: 5, name: "Baldur's Gate 3", reason: 'no_exact_match' },
        {
          id: 6,
          name: 'God of War',
          reason: 'external_id_taken',
          externalId: '123',
        },
      ],
    });

    expect(output).toContain('Total games without IGDB source: 3');
    expect(output).toContain('Matched: 1');
    expect(output).toContain('Unmatched: 2');
    expect(output).toContain("Baldur's Gate 3");
    expect(output).toContain('God of War');
    expect(output).toContain('IGDB 123');
  });

  it('prints a clean report when everything matched', () => {
    const output = formatBackfillReport({
      total: 2,
      matched: 2,
      unmatched: [],
    });

    expect(output).toContain('Unmatched: 0');
    expect(output).not.toContain('No exact match');
  });
});
