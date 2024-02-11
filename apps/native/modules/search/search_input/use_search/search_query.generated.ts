import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchGamesQueryVariables = Types.Exact<{
  search: Types.Scalars['String']['input'];
}>;


export type SearchGamesQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', games: Array<{ __typename?: 'SearchGamesResult', id: number, name: string, cover: { __typename?: 'Cover', small_url: string } }> } };


export const SearchGamesDocument = gql`
    query SearchGames($search: String!) {
  search(input: $search) {
    games {
      id
      name
      cover {
        small_url
      }
    }
  }
}
    `;

/**
 * __useSearchGamesQuery__
 *
 * To run a query within a React component, call `useSearchGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGamesQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchGamesQuery(baseOptions: Apollo.QueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
      }
export function useSearchGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
        }
export function useSearchGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
        }
export type SearchGamesQueryHookResult = ReturnType<typeof useSearchGamesQuery>;
export type SearchGamesLazyQueryHookResult = ReturnType<typeof useSearchGamesLazyQuery>;
export type SearchGamesSuspenseQueryHookResult = ReturnType<typeof useSearchGamesSuspenseQuery>;
export type SearchGamesQueryResult = Apollo.QueryResult<SearchGamesQuery, SearchGamesQueryVariables>;