import { create } from "zustand";

import { GameStatus } from "../../../../__generated__/types";

type UseGameStatusStoreStoreFields = {
  sort: {
    sortBy: string;
    field: string;
  };
  setSort: (sortBy: string, field: string) => void;
  setSearch: (search: string) => void;
  filters: {
    status: GameStatus;
    search: string;
  };
  updateFilters: (
    filters: Partial<UseGameStatusStoreStoreFields["filters"]>,
  ) => void;
};

export const useGameStatusStore = create<UseGameStatusStoreStoreFields>(
  (set) => ({
    sort: {
      sortBy: "added-desc",
      field: "added",
    },
    filters: {
      status: GameStatus.Completed,
      search: "",
    },
    setSort: (sortBy, field) =>
      set((state) => ({
        ...state,
        sort: {
          ...state.sort,
          sortBy,
          field,
        },
      })),
    setSearch: (search: string) =>
      set((state) => ({
        ...state,
        filters: {
          ...state.filters,
          search,
        },
      })),
    updateFilters: (filters) => {
      set((state) => ({
        ...state,
        filters: {
          ...state.filters,
          ...filters,
        },
      }));
    },
  }),
);
