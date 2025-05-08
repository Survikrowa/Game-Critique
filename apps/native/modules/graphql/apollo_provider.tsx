import { ApolloProvider as GraphQLProvider } from "@apollo/client";
// import { useApolloClientDevTools } from '@dev-plugins/apollo-client';
import { ReactNode } from "react";

import { useNewApolloClient } from "./apollo_client";

type ApolloProviderProps = {
  children: ReactNode;
};

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  const apolloClient = useNewApolloClient();
  // useApolloClientDevTools(apolloClient);
  return <GraphQLProvider client={apolloClient}>{children}</GraphQLProvider>;
};
