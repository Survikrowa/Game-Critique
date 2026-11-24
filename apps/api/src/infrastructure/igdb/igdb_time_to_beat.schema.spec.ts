import { IgdbTimeToBeatSchema } from './igdb_time_to_beat.schema';

describe('IgdbTimeToBeatSchema', () => {
  it('parses partial completion times', () => {
    const parsed = IgdbTimeToBeatSchema.safeParse({
      game_id: 1022,
      hastily: 54000,
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.completely).toBeUndefined();
  });

  it('rejects missing game_id', () => {
    expect(IgdbTimeToBeatSchema.safeParse({ hastily: 1 }).success).toBe(false);
  });
});
