import { create } from "zustand";

import { GameStatus } from "../../../../__generated__/types";

type UseGameStatusStoreStoreFields = {
  sort: {
    sortBy: string;
    field: string;
    order: string;
  };
  setSort: (sortBy: string, field: string, order: string) => void;
  setSearch: (search: string) => void;
  filters: {
    status: GameStatus;
    search: string;
    platform: string;
  };
  updateFilters: (
    filters: Partial<UseGameStatusStoreStoreFields["filters"]>,
  ) => void;
  pagination: {
    skip: number;
    take: number;
  };
  setPagination: (pagination: { skip: number; take: number }) => void;
};

export const useGameStatusStore = create<UseGameStatusStoreStoreFields>(
  (set) => ({
    sort: {
      sortBy: "added-desc",
      field: "added",
      order: "desc",
    },
    filters: {
      status: GameStatus.Completed,
      search: "",
      platform: "0",
    },
    pagination: {
      skip: 0,
      take: 9,
    },
    setPagination: (pagination) =>
      set((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      })),
    setSort: (sortBy, field, order) =>
      set((state) => ({
        ...state,
        sort: {
          ...state.sort,
          sortBy,
          field,
          order,
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
