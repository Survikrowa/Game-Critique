import { create } from "zustand";

type UseGameStatusReviewStoreFields = {
  setCurrentReview: ({ message, authorName }: Review) => void;
  currentReview: Review;
};

type Review = { message: string; authorName: string };

export const useGameStatusReviewStore = create<UseGameStatusReviewStoreFields>(
  (set) => ({
    setCurrentReview: ({ message, authorName }) => {
      set({ currentReview: { message, authorName } });
    },
    currentReview: { message: "", authorName: "" },
  }),
);
