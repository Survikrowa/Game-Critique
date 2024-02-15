import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FriendsListQuery = { __typename?: 'Query', friendsList: { __typename?: 'FriendsList', friends: Array<{ __typename?: 'FriendSingleEntry', id: string, name?: string | null, avatarUrl?: string | null }> } };


export const FriendsListDocument = gql`
    query FriendsList {
  friendsList {
    friends {
      id
      name
      avatarUrl
    }
  }
}
    `;

/**
 * __useFriendsListQuery__
 *
 * To run a query within a React component, call `useFriendsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsListQuery(baseOptions?: Apollo.QueryHookOptions<FriendsListQuery, FriendsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsListQuery, FriendsListQueryVariables>(FriendsListDocument, options);
      }
export function useFriendsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsListQuery, FriendsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsListQuery, FriendsListQueryVariables>(FriendsListDocument, options);
        }
export function useFriendsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendsListQuery, FriendsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendsListQuery, FriendsListQueryVariables>(FriendsListDocument, options);
        }
export type FriendsListQueryHookResult = ReturnType<typeof useFriendsListQuery>;
export type FriendsListLazyQueryHookResult = ReturnType<typeof useFriendsListLazyQuery>;
export type FriendsListSuspenseQueryHookResult = ReturnType<typeof useFriendsListSuspenseQuery>;
export type FriendsListQueryResult = Apollo.QueryResult<FriendsListQuery, FriendsListQueryVariables>;