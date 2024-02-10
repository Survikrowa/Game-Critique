export const pluralizePolish = (
  count: number,
  singular: string,
  plural: string,
  plural2: string,
) => {
  if (count === 1) {
    return singular;
  }
  if (count > 1 && count < 5) {
    return plural;
  }
  return plural2;
};
