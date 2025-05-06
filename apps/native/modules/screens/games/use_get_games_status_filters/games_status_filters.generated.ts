import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GamesStatusFiltersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GamesStatusFiltersQuery = { __typename?: 'Query', gamesStatusSortOptions: { __typename?: 'SortOptionsDTO', sortOptions: Array<{ __typename?: 'SortOptions', id: string, field: string, label: string, order: string }> }, availableGamesStatusProgressStates: { __typename?: 'GameStatusProgressStateDTO', gameStatusProgressState: Array<{ __typename?: 'GameStatusProgressState', label: string, value: Types.GameStatus }> } };


export const GamesStatusFiltersDocument = gql`
    query GamesStatusFilters {
  gamesStatusSortOptions {
    sortOptions {
      id
      field
      label
      order
    }
  }
  availableGamesStatusProgressStates {
    gameStatusProgressState {
      label
      value
    }
  }
}
    `;

/**
 * __useGamesStatusFiltersQuery__
 *
 * To run a query within a React component, call `useGamesStatusFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesStatusFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesStatusFiltersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesStatusFiltersQuery(baseOptions?: Apollo.QueryHookOptions<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>(GamesStatusFiltersDocument, options);
      }
export function useGamesStatusFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>(GamesStatusFiltersDocument, options);
        }
export function useGamesStatusFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>(GamesStatusFiltersDocument, options);
        }
export type GamesStatusFiltersQueryHookResult = ReturnType<typeof useGamesStatusFiltersQuery>;
export type GamesStatusFiltersLazyQueryHookResult = ReturnType<typeof useGamesStatusFiltersLazyQuery>;
export type GamesStatusFiltersSuspenseQueryHookResult = ReturnType<typeof useGamesStatusFiltersSuspenseQuery>;
export type GamesStatusFiltersQueryResult = Apollo.QueryResult<GamesStatusFiltersQuery, GamesStatusFiltersQueryVariables>;