import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompletionTimeComparisonQueryVariables = Types.Exact<{
  gameStatusId: Types.Scalars['Int']['input'];
}>;


export type CompletionTimeComparisonQuery = { __typename?: 'Query', completionTimeComparison: { __typename?: 'CompletionTimeComparisonDTO', myHours?: number | null, myMinutes?: number | null, mainStoryHours?: number | null, completionistHours?: number | null } };


export const CompletionTimeComparisonDocument = gql`
    query CompletionTimeComparison($gameStatusId: Int!) {
  completionTimeComparison(gameStatusId: $gameStatusId) {
    myHours
    myMinutes
    mainStoryHours
    completionistHours
  }
}
    `;

/**
 * __useCompletionTimeComparisonQuery__
 *
 * To run a query within a React component, call `useCompletionTimeComparisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletionTimeComparisonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletionTimeComparisonQuery({
 *   variables: {
 *      gameStatusId: // value for 'gameStatusId'
 *   },
 * });
 */
export function useCompletionTimeComparisonQuery(baseOptions: Apollo.QueryHookOptions<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>(CompletionTimeComparisonDocument, options);
      }
export function useCompletionTimeComparisonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>(CompletionTimeComparisonDocument, options);
        }
export function useCompletionTimeComparisonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>(CompletionTimeComparisonDocument, options);
        }
export type CompletionTimeComparisonQueryHookResult = ReturnType<typeof useCompletionTimeComparisonQuery>;
export type CompletionTimeComparisonLazyQueryHookResult = ReturnType<typeof useCompletionTimeComparisonLazyQuery>;
export type CompletionTimeComparisonSuspenseQueryHookResult = ReturnType<typeof useCompletionTimeComparisonSuspenseQuery>;
export type CompletionTimeComparisonQueryResult = Apollo.QueryResult<CompletionTimeComparisonQuery, CompletionTimeComparisonQueryVariables>;