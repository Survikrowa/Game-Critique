import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendsActivityQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FriendsActivityQuery = { __typename?: 'Query', friendsActivity: Array<{ __typename?: 'FriendsActivityDTO', user: { __typename?: 'User', name?: string | null, oauthId: string, activity: Array<{ __typename?: 'UserActivityDTO', activityType: Types.GameStatus, formattedUpdatedAt: string, game?: { __typename?: 'GameWithCoversDTO', name: string, cover?: { __typename?: 'CoverDTO', smallUrl: string } | null } | null }> } }> };


export const FriendsActivityDocument = gql`
    query FriendsActivity {
  friendsActivity {
    user {
      name
      oauthId
      activity {
        game {
          name
          cover {
            smallUrl
          }
        }
        activityType
        formattedUpdatedAt
      }
    }
  }
}
    `;

/**
 * __useFriendsActivityQuery__
 *
 * To run a query within a React component, call `useFriendsActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsActivityQuery(baseOptions?: Apollo.QueryHookOptions<FriendsActivityQuery, FriendsActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsActivityQuery, FriendsActivityQueryVariables>(FriendsActivityDocument, options);
      }
export function useFriendsActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsActivityQuery, FriendsActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsActivityQuery, FriendsActivityQueryVariables>(FriendsActivityDocument, options);
        }
export function useFriendsActivitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendsActivityQuery, FriendsActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendsActivityQuery, FriendsActivityQueryVariables>(FriendsActivityDocument, options);
        }
export type FriendsActivityQueryHookResult = ReturnType<typeof useFriendsActivityQuery>;
export type FriendsActivityLazyQueryHookResult = ReturnType<typeof useFriendsActivityLazyQuery>;
export type FriendsActivitySuspenseQueryHookResult = ReturnType<typeof useFriendsActivitySuspenseQuery>;
export type FriendsActivityQueryResult = Apollo.QueryResult<FriendsActivityQuery, FriendsActivityQueryVariables>;