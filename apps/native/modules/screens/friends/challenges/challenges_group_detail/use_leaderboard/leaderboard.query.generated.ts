import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GroupLeaderboardQueryVariables = Types.Exact<{
  groupId: Types.Scalars["Int"]["input"];
}>;

export type GroupLeaderboardQuery = {
  __typename?: "Query";
  groupLeaderboard: Array<{
    __typename?: "LeaderboardEntry";
    oauthId: string;
    name: string;
    avatarUrl: string;
    completedCount: number;
    forfeitedCount: number;
  }>;
};

export const GroupLeaderboardDocument = gql`
  query GroupLeaderboard($groupId: Int!) {
    groupLeaderboard(groupId: $groupId) {
      oauthId
      name
      avatarUrl
      completedCount
      forfeitedCount
    }
  }
`;

/**
 * __useGroupLeaderboardQuery__
 *
 * To run a query within a React component, call `useGroupLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupLeaderboardQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupLeaderboardQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupLeaderboardQuery,
    GroupLeaderboardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupLeaderboardQuery, GroupLeaderboardQueryVariables>(
    GroupLeaderboardDocument,
    options,
  );
}
export function useGroupLeaderboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupLeaderboardQuery,
    GroupLeaderboardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GroupLeaderboardQuery,
    GroupLeaderboardQueryVariables
  >(GroupLeaderboardDocument, options);
}
export function useGroupLeaderboardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GroupLeaderboardQuery,
    GroupLeaderboardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GroupLeaderboardQuery,
    GroupLeaderboardQueryVariables
  >(GroupLeaderboardDocument, options);
}
export type GroupLeaderboardQueryHookResult = ReturnType<
  typeof useGroupLeaderboardQuery
>;
export type GroupLeaderboardLazyQueryHookResult = ReturnType<
  typeof useGroupLeaderboardLazyQuery
>;
export type GroupLeaderboardSuspenseQueryHookResult = ReturnType<
  typeof useGroupLeaderboardSuspenseQuery
>;
export type GroupLeaderboardQueryResult = Apollo.QueryResult<
  GroupLeaderboardQuery,
  GroupLeaderboardQueryVariables
>;
