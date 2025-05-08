import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameInfoQueryVariables = Types.Exact<{
  hltbId: Types.Scalars['Float']['input'];
}>;


export type GameInfoQuery = { __typename?: 'Query', game: { __typename?: 'GameWithAllDataDTO', id: number, name: string, hltbId: number, cover?: { __typename?: 'CoverDTO', mediumUrl: string } | null, platforms: Array<{ __typename?: 'PlatformDTO', name: string, id: number }>, genres: Array<{ __typename?: 'GenresDto', name: string }>, releases?: { __typename?: 'GameReleaseDTO', date?: number | null } | null, completionTime?: { __typename?: 'GameCompletionTimeDTO', main: number, mainExtra: number, completionist: number } | null } };


export const GameInfoDocument = gql`
    query GameInfo($hltbId: Float!) {
  game(hltbId: $hltbId) {
    id
    name
    hltbId
    cover {
      mediumUrl
    }
    platforms {
      name
      id
    }
    genres {
      name
    }
    releases {
      date
    }
    completionTime {
      main
      mainExtra
      completionist
    }
  }
}
    `;

/**
 * __useGameInfoQuery__
 *
 * To run a query within a React component, call `useGameInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameInfoQuery({
 *   variables: {
 *      hltbId: // value for 'hltbId'
 *   },
 * });
 */
export function useGameInfoQuery(baseOptions: Apollo.QueryHookOptions<GameInfoQuery, GameInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameInfoQuery, GameInfoQueryVariables>(GameInfoDocument, options);
      }
export function useGameInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameInfoQuery, GameInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameInfoQuery, GameInfoQueryVariables>(GameInfoDocument, options);
        }
export function useGameInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GameInfoQuery, GameInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GameInfoQuery, GameInfoQueryVariables>(GameInfoDocument, options);
        }
export type GameInfoQueryHookResult = ReturnType<typeof useGameInfoQuery>;
export type GameInfoLazyQueryHookResult = ReturnType<typeof useGameInfoLazyQuery>;
export type GameInfoSuspenseQueryHookResult = ReturnType<typeof useGameInfoSuspenseQuery>;
export type GameInfoQueryResult = Apollo.QueryResult<GameInfoQuery, GameInfoQueryVariables>;