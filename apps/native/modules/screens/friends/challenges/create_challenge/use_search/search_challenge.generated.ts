import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchForChallengeQueryVariables = Types.Exact<{
  search: Types.Scalars['String']['input'];
}>;


export type SearchForChallengeQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', games: Array<{ __typename?: 'SearchGamesResult', id: number, name: string, cover: { __typename?: 'Cover', small_url: string } }> } };


export const SearchForChallengeDocument = gql`
    query SearchForChallenge($search: String!) {
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
 * __useSearchForChallengeQuery__
 *
 * To run a query within a React component, call `useSearchForChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForChallengeQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchForChallengeQuery(baseOptions: Apollo.QueryHookOptions<SearchForChallengeQuery, SearchForChallengeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForChallengeQuery, SearchForChallengeQueryVariables>(SearchForChallengeDocument, options);
      }
export function useSearchForChallengeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForChallengeQuery, SearchForChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForChallengeQuery, SearchForChallengeQueryVariables>(SearchForChallengeDocument, options);
        }
export function useSearchForChallengeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchForChallengeQuery, SearchForChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchForChallengeQuery, SearchForChallengeQueryVariables>(SearchForChallengeDocument, options);
        }
export type SearchForChallengeQueryHookResult = ReturnType<typeof useSearchForChallengeQuery>;
export type SearchForChallengeLazyQueryHookResult = ReturnType<typeof useSearchForChallengeLazyQuery>;
export type SearchForChallengeSuspenseQueryHookResult = ReturnType<typeof useSearchForChallengeSuspenseQuery>;
export type SearchForChallengeQueryResult = Apollo.QueryResult<SearchForChallengeQuery, SearchForChallengeQueryVariables>;