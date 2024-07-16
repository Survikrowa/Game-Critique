import { QueryClient } from "@tanstack/react-query";

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
};
