import { ApolloProvider as GraphQLProvider } from "@apollo/client";
import { ReactNode } from "react";

import { useNewApolloClient } from "./apollo_client";

type ApolloProviderProps = {
  children: ReactNode;
};

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  const apolloClient = useNewApolloClient();

  return <GraphQLProvider client={apolloClient}>{children}</GraphQLProvider>;
};
