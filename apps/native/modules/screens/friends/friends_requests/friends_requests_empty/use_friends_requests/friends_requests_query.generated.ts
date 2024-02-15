import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendsRequestsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FriendsRequestsQuery = { __typename?: 'Query', friendsRequests: Array<{ __typename?: 'GetFriendRequestsResponseDTO', senderOauthId: string, senderProfile?: { __typename?: 'ProfileInfoDTO', name?: string | null, avatarUrl: string } | null }> };


export const FriendsRequestsDocument = gql`
    query FriendsRequests {
  friendsRequests {
    senderOauthId
    senderProfile {
      name
      avatarUrl
    }
  }
}
    `;

/**
 * __useFriendsRequestsQuery__
 *
 * To run a query within a React component, call `useFriendsRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsRequestsQuery, FriendsRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsRequestsQuery, FriendsRequestsQueryVariables>(FriendsRequestsDocument, options);
      }
export function useFriendsRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsRequestsQuery, FriendsRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsRequestsQuery, FriendsRequestsQueryVariables>(FriendsRequestsDocument, options);
        }
export function useFriendsRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendsRequestsQuery, FriendsRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendsRequestsQuery, FriendsRequestsQueryVariables>(FriendsRequestsDocument, options);
        }
export type FriendsRequestsQueryHookResult = ReturnType<typeof useFriendsRequestsQuery>;
export type FriendsRequestsLazyQueryHookResult = ReturnType<typeof useFriendsRequestsLazyQuery>;
export type FriendsRequestsSuspenseQueryHookResult = ReturnType<typeof useFriendsRequestsSuspenseQuery>;
export type FriendsRequestsQueryResult = Apollo.QueryResult<FriendsRequestsQuery, FriendsRequestsQueryVariables>;