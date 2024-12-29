import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import * as Types from "../../../../../../types.ts";

import { fetchData } from "@/codegen/fetcher.ts";

export type UserGamesStatusQueryVariables = Types.Exact<{
  oauthId: Types.Scalars["String"]["input"];
}>;

export type UserGamesStatusQuery = {
  __typename?: "Query";
  getAllUserGamesStatusByOauthId: Array<{
    __typename?: "UserGamesStatusResponseDTO";
    id: number;
    status: Types.GameStatus;
    game: { __typename?: "GameWithAllDataDTO"; id: number; name: string };
  }>;
};

export const UserGamesStatusDocument = `
    query UserGamesStatus($oauthId: String!) {
  getAllUserGamesStatusByOauthId(oauthId: $oauthId) {
    id
    status
    game {
      id
      name
    }
  }
}
    `;

export const useUserGamesStatusQuery = <
  TData = UserGamesStatusQuery,
  TError = unknown,
>(
  variables: UserGamesStatusQueryVariables,
  options?: Omit<
    UseQueryOptions<UserGamesStatusQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<UserGamesStatusQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<UserGamesStatusQuery, TError, TData>({
    queryKey: ["UserGamesStatus", variables],
    queryFn: fetchData<UserGamesStatusQuery, UserGamesStatusQueryVariables>(
      UserGamesStatusDocument,
      variables,
    ),
    ...options,
  });
};
