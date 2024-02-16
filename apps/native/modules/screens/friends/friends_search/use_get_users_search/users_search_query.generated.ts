import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersSearchQueryVariables = Types.Exact<{
  input: Types.Scalars['String']['input'];
}>;


export type UsersSearchQuery = { __typename?: 'Query', usersSearch: Array<{ __typename?: 'UserSearchResultDTO', oauthId: string, isFriendRequestSent: boolean, profile?: { __typename?: 'ProfileInfoDTO', id: number, name?: string | null, avatarUrl: string } | null }> };


export const UsersSearchDocument = gql`
    query UsersSearch($input: String!) {
  usersSearch(input: $input) {
    oauthId
    profile {
      id
      name
      avatarUrl
    }
    isFriendRequestSent
  }
}
    `;

/**
 * __useUsersSearchQuery__
 *
 * To run a query within a React component, call `useUsersSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersSearchQuery(baseOptions: Apollo.QueryHookOptions<UsersSearchQuery, UsersSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersSearchQuery, UsersSearchQueryVariables>(UsersSearchDocument, options);
      }
export function useUsersSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersSearchQuery, UsersSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersSearchQuery, UsersSearchQueryVariables>(UsersSearchDocument, options);
        }
export function useUsersSearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersSearchQuery, UsersSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersSearchQuery, UsersSearchQueryVariables>(UsersSearchDocument, options);
        }
export type UsersSearchQueryHookResult = ReturnType<typeof useUsersSearchQuery>;
export type UsersSearchLazyQueryHookResult = ReturnType<typeof useUsersSearchLazyQuery>;
export type UsersSearchSuspenseQueryHookResult = ReturnType<typeof useUsersSearchSuspenseQuery>;
export type UsersSearchQueryResult = Apollo.QueryResult<UsersSearchQuery, UsersSearchQueryVariables>;