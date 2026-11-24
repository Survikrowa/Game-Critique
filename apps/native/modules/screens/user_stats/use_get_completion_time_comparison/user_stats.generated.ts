import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HltbComparisonQueryVariables = Types.Exact<{
  gameStatusId: Types.Scalars['Int']['input'];
}>;


export type HltbComparisonQuery = { __typename?: 'Query', hltbComparison: { __typename?: 'HLTBComparisonDTO', myHours?: number | null, myMinutes?: number | null, mainStoryHours?: number | null, completionistHours?: number | null } };


export const HltbComparisonDocument = gql`
    query HltbComparison($gameStatusId: Int!) {
  hltbComparison(gameStatusId: $gameStatusId) {
    myHours
    myMinutes
    mainStoryHours
    completionistHours
  }
}
    `;

/**
 * __useHltbComparisonQuery__
 *
 * To run a query within a React component, call `useHltbComparisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useHltbComparisonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHltbComparisonQuery({
 *   variables: {
 *      gameStatusId: // value for 'gameStatusId'
 *   },
 * });
 */
export function useHltbComparisonQuery(baseOptions: Apollo.QueryHookOptions<HltbComparisonQuery, HltbComparisonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HltbComparisonQuery, HltbComparisonQueryVariables>(HltbComparisonDocument, options);
      }
export function useHltbComparisonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HltbComparisonQuery, HltbComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HltbComparisonQuery, HltbComparisonQueryVariables>(HltbComparisonDocument, options);
        }
export function useHltbComparisonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HltbComparisonQuery, HltbComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HltbComparisonQuery, HltbComparisonQueryVariables>(HltbComparisonDocument, options);
        }
export type HltbComparisonQueryHookResult = ReturnType<typeof useHltbComparisonQuery>;
export type HltbComparisonLazyQueryHookResult = ReturnType<typeof useHltbComparisonLazyQuery>;
export type HltbComparisonSuspenseQueryHookResult = ReturnType<typeof useHltbComparisonSuspenseQuery>;
export type HltbComparisonQueryResult = Apollo.QueryResult<HltbComparisonQuery, HltbComparisonQueryVariables>;