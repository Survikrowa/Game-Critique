import { getQueryClient } from "./get_query_client";
import { QueryClientProvider as QCProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type QueryClientProviderProps = {
  children: ReactNode;
};

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  const queryClient = getQueryClient();
  return <QCProvider client={queryClient}>{children}</QCProvider>;
};
