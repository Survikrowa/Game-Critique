import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";
import { useAuth0 } from "react-native-auth0";

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
});
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("oauthToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const useNewApolloClient = () => {
  const { clearSession } = useAuth0();
  return useMemo(() => {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(async ({ message }) => {
          const token = await SecureStore.getItemAsync("oauthToken");
          if (message === "Unauthorized" && token) {
            SecureStore.deleteItemAsync("oauthToken");
            clearSession();
          }
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    return new ApolloClient({
      link: from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              userGamesStatus: {
                keyArgs: ["status"],
                merge(_, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
    });
  }, []);
};
