import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendMonthlyActivityQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
}>;


export type FriendMonthlyActivityQuery = { __typename?: 'Query', friendMonthlyActivity: Array<{ __typename?: 'FriendMonthlyActivityDTO', month: number, gamesCompleted: number, hoursPlayed: number }> };


export const FriendMonthlyActivityDocument = gql`
    query FriendMonthlyActivity($oauthId: String!, $year: Int!) {
  friendMonthlyActivity(oauthId: $oauthId, year: $year) {
    month
    gamesCompleted
    hoursPlayed
  }
}
    `;

/**
 * __useFriendMonthlyActivityQuery__
 *
 * To run a query within a React component, call `useFriendMonthlyActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendMonthlyActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendMonthlyActivityQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useFriendMonthlyActivityQuery(baseOptions: Apollo.QueryHookOptions<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>(FriendMonthlyActivityDocument, options);
      }
export function useFriendMonthlyActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>(FriendMonthlyActivityDocument, options);
        }
export function useFriendMonthlyActivitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>(FriendMonthlyActivityDocument, options);
        }
export type FriendMonthlyActivityQueryHookResult = ReturnType<typeof useFriendMonthlyActivityQuery>;
export type FriendMonthlyActivityLazyQueryHookResult = ReturnType<typeof useFriendMonthlyActivityLazyQuery>;
export type FriendMonthlyActivitySuspenseQueryHookResult = ReturnType<typeof useFriendMonthlyActivitySuspenseQuery>;
export type FriendMonthlyActivityQueryResult = Apollo.QueryResult<FriendMonthlyActivityQuery, FriendMonthlyActivityQueryVariables>;