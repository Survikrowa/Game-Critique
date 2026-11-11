import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ChallengeGroupsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ChallengeGroupsQuery = {
  __typename?: "Query";
  challengeGroups: Array<{
    __typename?: "ChallengeGroup";
    id: string;
    name: string;
    ownerId: string;
    members: Array<{
      __typename?: "ChallengeGroupMember";
      oauthId: string;
      status: Types.ChallengeGroupMemberStatus;
    }>;
  }>;
};

export const ChallengeGroupsDocument = gql`
  query ChallengeGroups {
    challengeGroups {
      id
      name
      ownerId
      members {
        oauthId
        status
      }
    }
  }
`;

/**
 * __useChallengeGroupsQuery__
 *
 * To run a query within a React component, call `useChallengeGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChallengeGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ChallengeGroupsQuery,
    ChallengeGroupsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChallengeGroupsQuery, ChallengeGroupsQueryVariables>(
    ChallengeGroupsDocument,
    options,
  );
}
export function useChallengeGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChallengeGroupsQuery,
    ChallengeGroupsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ChallengeGroupsQuery,
    ChallengeGroupsQueryVariables
  >(ChallengeGroupsDocument, options);
}
export function useChallengeGroupsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ChallengeGroupsQuery,
    ChallengeGroupsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ChallengeGroupsQuery,
    ChallengeGroupsQueryVariables
  >(ChallengeGroupsDocument, options);
}
export type ChallengeGroupsQueryHookResult = ReturnType<
  typeof useChallengeGroupsQuery
>;
export type ChallengeGroupsLazyQueryHookResult = ReturnType<
  typeof useChallengeGroupsLazyQuery
>;
export type ChallengeGroupsSuspenseQueryHookResult = ReturnType<
  typeof useChallengeGroupsSuspenseQuery
>;
export type ChallengeGroupsQueryResult = Apollo.QueryResult<
  ChallengeGroupsQuery,
  ChallengeGroupsQueryVariables
>;
