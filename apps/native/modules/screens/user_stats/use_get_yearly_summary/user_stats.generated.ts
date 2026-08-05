import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type YearlySummaryQueryVariables = Types.Exact<{
  year?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type YearlySummaryQuery = { __typename?: 'Query', yearlySummary: { __typename?: 'YearlySummaryDTO', totalGames: number, totalHours: number, averageScore?: number | null, completedThisYear: number, backlogAddedThisYear: number, yearlyGames: number, yearlyHours: number, yearlyAverageScore?: number | null } };


export const YearlySummaryDocument = gql`
    query YearlySummary($year: Int) {
  yearlySummary(year: $year) {
    totalGames
    totalHours
    averageScore
    completedThisYear
    backlogAddedThisYear
    yearlyGames
    yearlyHours
    yearlyAverageScore
  }
}
    `;

/**
 * __useYearlySummaryQuery__
 *
 * To run a query within a React component, call `useYearlySummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useYearlySummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYearlySummaryQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useYearlySummaryQuery(baseOptions?: Apollo.QueryHookOptions<YearlySummaryQuery, YearlySummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<YearlySummaryQuery, YearlySummaryQueryVariables>(YearlySummaryDocument, options);
      }
export function useYearlySummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<YearlySummaryQuery, YearlySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<YearlySummaryQuery, YearlySummaryQueryVariables>(YearlySummaryDocument, options);
        }
export function useYearlySummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<YearlySummaryQuery, YearlySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<YearlySummaryQuery, YearlySummaryQueryVariables>(YearlySummaryDocument, options);
        }
export type YearlySummaryQueryHookResult = ReturnType<typeof useYearlySummaryQuery>;
export type YearlySummaryLazyQueryHookResult = ReturnType<typeof useYearlySummaryLazyQuery>;
export type YearlySummarySuspenseQueryHookResult = ReturnType<typeof useYearlySummarySuspenseQuery>;
export type YearlySummaryQueryResult = Apollo.QueryResult<YearlySummaryQuery, YearlySummaryQueryVariables>;