import { isServer, QueryClient } from "@tanstack/react-query";
import { makeQueryClient } from "./make_query_client";

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};
