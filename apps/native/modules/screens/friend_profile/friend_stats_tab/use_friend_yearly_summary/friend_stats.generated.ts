import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendYearlySummaryQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
}>;


export type FriendYearlySummaryQuery = { __typename?: 'Query', friendYearlySummary: { __typename?: 'FriendYearlySummaryDTO', totalGames: number, totalHours: number, averageScore?: number | null, completedThisYear: number, backlogAddedThisYear: number, yearlyGames: number, yearlyHours: number, yearlyAverageScore?: number | null } };


export const FriendYearlySummaryDocument = gql`
    query FriendYearlySummary($oauthId: String!, $year: Int!) {
  friendYearlySummary(oauthId: $oauthId, year: $year) {
    totalGames
    totalHours
    averageScore
    completedThisYear
    backlogAddedThisYear
    yearlyGames
    yearlyHours
    yearlyAverageScore
  }
}
    `;

/**
 * __useFriendYearlySummaryQuery__
 *
 * To run a query within a React component, call `useFriendYearlySummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendYearlySummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendYearlySummaryQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useFriendYearlySummaryQuery(baseOptions: Apollo.QueryHookOptions<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>(FriendYearlySummaryDocument, options);
      }
export function useFriendYearlySummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>(FriendYearlySummaryDocument, options);
        }
export function useFriendYearlySummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>(FriendYearlySummaryDocument, options);
        }
export type FriendYearlySummaryQueryHookResult = ReturnType<typeof useFriendYearlySummaryQuery>;
export type FriendYearlySummaryLazyQueryHookResult = ReturnType<typeof useFriendYearlySummaryLazyQuery>;
export type FriendYearlySummarySuspenseQueryHookResult = ReturnType<typeof useFriendYearlySummarySuspenseQuery>;
export type FriendYearlySummaryQueryResult = Apollo.QueryResult<FriendYearlySummaryQuery, FriendYearlySummaryQueryVariables>;