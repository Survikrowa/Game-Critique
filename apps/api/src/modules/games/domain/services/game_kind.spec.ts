import { classifyGameKind } from './game_kind';

describe('classifyGameKind', () => {
  it('classifies main game as base', () => {
    expect(
      classifyGameKind({
        gameType: 0,
        hasVersionParent: false,
        hasParentGame: false,
      }),
    ).toBe('base');
  });

  it('classifies remaster as edition', () => {
    expect(
      classifyGameKind({
        gameType: 9,
        hasVersionParent: false,
        hasParentGame: false,
      }),
    ).toBe('edition');
  });

  it('classifies dlc as dlc', () => {
    expect(
      classifyGameKind({
        gameType: 1,
        hasVersionParent: false,
        hasParentGame: true,
      }),
    ).toBe('dlc');
  });
});
