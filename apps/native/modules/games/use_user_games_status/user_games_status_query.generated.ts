import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserGamesStatusQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserGamesStatusQueryQuery = { __typename?: 'Query', userGamesStatus: Array<{ __typename?: 'UserGamesStatusResponseDTO', id: number, status: Types.GameStatus, game: { __typename?: 'GameWithCoversDTO', name: string, cover?: { __typename?: 'CoverDTO', bigUrl: string } | null }, platform: { __typename?: 'PlatformDTO', name: string } }> };


export const UserGamesStatusQueryDocument = gql`
    query UserGamesStatusQuery {
  userGamesStatus {
    id
    game {
      name
      cover {
        bigUrl
      }
    }
    status
    platform {
      name
    }
  }
}
    `;

/**
 * __useUserGamesStatusQueryQuery__
 *
 * To run a query within a React component, call `useUserGamesStatusQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGamesStatusQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGamesStatusQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserGamesStatusQueryQuery(baseOptions?: Apollo.QueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
      }
export function useUserGamesStatusQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
        }
export function useUserGamesStatusQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
        }
export type UserGamesStatusQueryQueryHookResult = ReturnType<typeof useUserGamesStatusQueryQuery>;
export type UserGamesStatusQueryLazyQueryHookResult = ReturnType<typeof useUserGamesStatusQueryLazyQuery>;
export type UserGamesStatusQuerySuspenseQueryHookResult = ReturnType<typeof useUserGamesStatusQuerySuspenseQuery>;
export type UserGamesStatusQueryQueryResult = Apollo.QueryResult<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>;