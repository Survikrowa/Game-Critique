import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendStreakQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
}>;


export type FriendStreakQuery = { __typename?: 'Query', friendStreak: { __typename?: 'FriendStreakDTO', currentStreak: number, longestStreak: number } };


export const FriendStreakDocument = gql`
    query FriendStreak($oauthId: String!) {
  friendStreak(oauthId: $oauthId) {
    currentStreak
    longestStreak
  }
}
    `;

/**
 * __useFriendStreakQuery__
 *
 * To run a query within a React component, call `useFriendStreakQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendStreakQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendStreakQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *   },
 * });
 */
export function useFriendStreakQuery(baseOptions: Apollo.QueryHookOptions<FriendStreakQuery, FriendStreakQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendStreakQuery, FriendStreakQueryVariables>(FriendStreakDocument, options);
      }
export function useFriendStreakLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendStreakQuery, FriendStreakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendStreakQuery, FriendStreakQueryVariables>(FriendStreakDocument, options);
        }
export function useFriendStreakSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendStreakQuery, FriendStreakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendStreakQuery, FriendStreakQueryVariables>(FriendStreakDocument, options);
        }
export type FriendStreakQueryHookResult = ReturnType<typeof useFriendStreakQuery>;
export type FriendStreakLazyQueryHookResult = ReturnType<typeof useFriendStreakLazyQuery>;
export type FriendStreakSuspenseQueryHookResult = ReturnType<typeof useFriendStreakSuspenseQuery>;
export type FriendStreakQueryResult = Apollo.QueryResult<FriendStreakQuery, FriendStreakQueryVariables>;