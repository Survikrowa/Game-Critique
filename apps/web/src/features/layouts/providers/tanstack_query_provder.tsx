import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { useCustomQueryClient } from "@/packages/tanstack_query/use_custom_query_client/use_custom_query_client.ts";

type TanstackQueryProviderProps = {
  children: ReactNode;
};

export const TanstackQueryProvider = ({
  children,
}: TanstackQueryProviderProps) => {
  const queryClient = useCustomQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
