import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncomingGamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IncomingGamesQuery = { __typename?: 'Query', upcomingGames: Array<{ __typename?: 'ExternalGameDTO', id: string, name: string, coverUrl?: string | null, backgroundUrl?: string | null, releaseDate: any, platforms: Array<{ __typename?: 'ExternalGamePlatformDTO', id: string, name: string }> }> };


export const IncomingGamesDocument = gql`
    query IncomingGames {
  upcomingGames(limit: 20) {
    id
    name
    platforms {
      id
      name
    }
    coverUrl
    backgroundUrl
    releaseDate
  }
}
    `;

/**
 * __useIncomingGamesQuery__
 *
 * To run a query within a React component, call `useIncomingGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncomingGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncomingGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useIncomingGamesQuery(baseOptions?: Apollo.QueryHookOptions<IncomingGamesQuery, IncomingGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncomingGamesQuery, IncomingGamesQueryVariables>(IncomingGamesDocument, options);
      }
export function useIncomingGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncomingGamesQuery, IncomingGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncomingGamesQuery, IncomingGamesQueryVariables>(IncomingGamesDocument, options);
        }
export function useIncomingGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IncomingGamesQuery, IncomingGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IncomingGamesQuery, IncomingGamesQueryVariables>(IncomingGamesDocument, options);
        }
export type IncomingGamesQueryHookResult = ReturnType<typeof useIncomingGamesQuery>;
export type IncomingGamesLazyQueryHookResult = ReturnType<typeof useIncomingGamesLazyQuery>;
export type IncomingGamesSuspenseQueryHookResult = ReturnType<typeof useIncomingGamesSuspenseQuery>;
export type IncomingGamesQueryResult = Apollo.QueryResult<IncomingGamesQuery, IncomingGamesQueryVariables>;