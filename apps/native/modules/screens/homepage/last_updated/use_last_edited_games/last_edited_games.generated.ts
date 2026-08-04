import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LastEditedGamesQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']['input'];
}>;


export type LastEditedGamesQuery = { __typename?: 'Query', lastEditedGames: Array<{ __typename?: 'LastEditedGamesStatusDTO', id: number, name: string, status: Types.GameStatus, cover?: { __typename?: 'CoverDTO', bigUrl: string } | null }> };


export const LastEditedGamesDocument = gql`
    query LastEditedGames($limit: Int!) {
  lastEditedGames(limit: $limit) {
    id
    name
    status
    cover {
      bigUrl
    }
  }
}
    `;

/**
 * __useLastEditedGamesQuery__
 *
 * To run a query within a React component, call `useLastEditedGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastEditedGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastEditedGamesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLastEditedGamesQuery(baseOptions: Apollo.QueryHookOptions<LastEditedGamesQuery, LastEditedGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LastEditedGamesQuery, LastEditedGamesQueryVariables>(LastEditedGamesDocument, options);
      }
export function useLastEditedGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LastEditedGamesQuery, LastEditedGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LastEditedGamesQuery, LastEditedGamesQueryVariables>(LastEditedGamesDocument, options);
        }
export function useLastEditedGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LastEditedGamesQuery, LastEditedGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LastEditedGamesQuery, LastEditedGamesQueryVariables>(LastEditedGamesDocument, options);
        }
export type LastEditedGamesQueryHookResult = ReturnType<typeof useLastEditedGamesQuery>;
export type LastEditedGamesLazyQueryHookResult = ReturnType<typeof useLastEditedGamesLazyQuery>;
export type LastEditedGamesSuspenseQueryHookResult = ReturnType<typeof useLastEditedGamesSuspenseQuery>;
export type LastEditedGamesQueryResult = Apollo.QueryResult<LastEditedGamesQuery, LastEditedGamesQueryVariables>;