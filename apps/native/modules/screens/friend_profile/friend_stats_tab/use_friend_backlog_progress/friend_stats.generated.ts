import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendBacklogProgressQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
  year?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type FriendBacklogProgressQuery = { __typename?: 'Query', friendBacklogProgress: { __typename?: 'FriendBacklogProgressDTO', completed: number, added: number, ratio: number } };


export const FriendBacklogProgressDocument = gql`
    query FriendBacklogProgress($oauthId: String!, $year: Int) {
  friendBacklogProgress(oauthId: $oauthId, year: $year) {
    completed
    added
    ratio
  }
}
    `;

/**
 * __useFriendBacklogProgressQuery__
 *
 * To run a query within a React component, call `useFriendBacklogProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendBacklogProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendBacklogProgressQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useFriendBacklogProgressQuery(baseOptions: Apollo.QueryHookOptions<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>(FriendBacklogProgressDocument, options);
      }
export function useFriendBacklogProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>(FriendBacklogProgressDocument, options);
        }
export function useFriendBacklogProgressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>(FriendBacklogProgressDocument, options);
        }
export type FriendBacklogProgressQueryHookResult = ReturnType<typeof useFriendBacklogProgressQuery>;
export type FriendBacklogProgressLazyQueryHookResult = ReturnType<typeof useFriendBacklogProgressLazyQuery>;
export type FriendBacklogProgressSuspenseQueryHookResult = ReturnType<typeof useFriendBacklogProgressSuspenseQuery>;
export type FriendBacklogProgressQueryResult = Apollo.QueryResult<FriendBacklogProgressQuery, FriendBacklogProgressQueryVariables>;