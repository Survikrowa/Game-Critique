import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ChallengesQueryVariables = Types.Exact<{
  groupId: Types.Scalars["Int"]["input"];
  status?: Types.InputMaybe<Types.ChallengeStatus>;
}>;

export type ChallengesQuery = {
  __typename?: "Query";
  challenges: Array<{
    __typename?: "Challenge";
    id: string;
    type: Types.ChallengeType;
    status: Types.ChallengeStatus;
    gameId: number;
    gameName?: string | null;
    gameCover?: string | null;
    description?: string | null;
    challengerId: string;
    recipientId: string;
    challengerName?: string | null;
    recipientName?: string | null;
    completedAt?: any | null;
    forfeitedAt?: any | null;
  }>;
};

export const ChallengesDocument = gql`
  query Challenges($groupId: Int!, $status: ChallengeStatus) {
    challenges(groupId: $groupId, status: $status) {
      id
      type
      status
      gameId
      gameName
      gameCover
      description
      challengerId
      recipientId
      challengerName
      recipientName
      completedAt
      forfeitedAt
    }
  }
`;

/**
 * __useChallengesQuery__
 *
 * To run a query within a React component, call `useChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengesQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChallengesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ChallengesQuery,
    ChallengesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChallengesQuery, ChallengesQueryVariables>(
    ChallengesDocument,
    options,
  );
}
export function useChallengesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChallengesQuery,
    ChallengesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ChallengesQuery, ChallengesQueryVariables>(
    ChallengesDocument,
    options,
  );
}
export function useChallengesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ChallengesQuery,
    ChallengesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ChallengesQuery, ChallengesQueryVariables>(
    ChallengesDocument,
    options,
  );
}
export type ChallengesQueryHookResult = ReturnType<typeof useChallengesQuery>;
export type ChallengesLazyQueryHookResult = ReturnType<
  typeof useChallengesLazyQuery
>;
export type ChallengesSuspenseQueryHookResult = ReturnType<
  typeof useChallengesSuspenseQuery
>;
export type ChallengesQueryResult = Apollo.QueryResult<
  ChallengesQuery,
  ChallengesQueryVariables
>;
