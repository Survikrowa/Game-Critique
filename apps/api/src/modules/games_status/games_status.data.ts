type SortOption = {
  id: string;
  field: string;
  order: 'asc' | 'desc';
  label: string;
};

const SCORE_DESCENDING = {
  id: 'score-desc',
  field: 'score',
  order: 'desc',
  label: 'Ocena malejąco',
} satisfies SortOption;

const SCORE_ASCENDING = {
  id: 'score-asc',
  field: 'score',
  order: 'asc',
  label: 'Ocena rosnąco',
} satisfies SortOption;

const ADDED_DESCENDING = {
  id: 'added-desc',
  field: 'added',
  order: 'desc',
  label: 'Ostatnio dodane',
} satisfies SortOption;
const ADDED_ASCENDING = {
  id: 'added-asc',
  field: 'added',
  order: 'asc',
  label: 'Najstarsze',
} satisfies SortOption;

const ALPHABETICAL_ASCENDING = {
  id: 'alphabetical-asc',
  field: 'title',
  order: 'asc',
  label: 'Alfabetycznie A-Z',
} satisfies SortOption;

export const SORT_OPTIONS = [
  SCORE_DESCENDING,
  SCORE_ASCENDING,
  ADDED_DESCENDING,
  ADDED_ASCENDING,
  ALPHABETICAL_ASCENDING,
] satisfies SortOption[];
