import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Constants from "expo-constants";
import { isDevice } from "expo-device";
import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";
import { Platform } from "react-native";
import { useAuth0 } from "react-native-auth0";

const getServerUrl = () => {
  if (isDevice) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(":")[0];
    if (!localhost) {
      return process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;
    }
    return localhost;
  }
  if (
    process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT.includes("localhost") &&
    Platform.OS === "android"
  ) {
    return "http://10.0.2.2:3001/graphql";
  }
  return process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;
};
if (process.env.NODE_ENV !== "production") {
  loadErrorMessages();
  loadDevMessages();
}
const httpLink = createHttpLink({
  uri: getServerUrl(),
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
                keyArgs: ["status", "oauthId"],
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
