import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { CustomGraphlQLFetchError } from "@/packages/error_handling/custom_errors.ts";
import { getErrorToastBody } from "@/packages/tanstack_query/use_custom_query_client/get_error_toast_body.ts";
import { useToast } from "@/packages/ui/feedback/toast/use-toast.ts";

export const useCustomQueryClient = () => {
  const { toast } = useToast();
  const queryCache = useMemo(() => {
    return new QueryCache({
      onError: (error) => {
        if (error instanceof CustomGraphlQLFetchError) {
          toast(getErrorToastBody(error.statusCode));
        }
      },
    });
  }, [toast]);

  return useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchOnWindowFocus: false,
        },
      },
      queryCache,
    });
  }, [queryCache]);
};
