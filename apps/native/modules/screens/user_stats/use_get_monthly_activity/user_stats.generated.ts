import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MonthlyActivityQueryVariables = Types.Exact<{
  year: Types.Scalars['Int']['input'];
}>;


export type MonthlyActivityQuery = { __typename?: 'Query', monthlyActivity: Array<{ __typename?: 'MonthlyActivityDTO', month: number, gamesCompleted: number, hoursPlayed: number }> };


export const MonthlyActivityDocument = gql`
    query MonthlyActivity($year: Int!) {
  monthlyActivity(year: $year) {
    month
    gamesCompleted
    hoursPlayed
  }
}
    `;

/**
 * __useMonthlyActivityQuery__
 *
 * To run a query within a React component, call `useMonthlyActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlyActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlyActivityQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useMonthlyActivityQuery(baseOptions: Apollo.QueryHookOptions<MonthlyActivityQuery, MonthlyActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonthlyActivityQuery, MonthlyActivityQueryVariables>(MonthlyActivityDocument, options);
      }
export function useMonthlyActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonthlyActivityQuery, MonthlyActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonthlyActivityQuery, MonthlyActivityQueryVariables>(MonthlyActivityDocument, options);
        }
export function useMonthlyActivitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MonthlyActivityQuery, MonthlyActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MonthlyActivityQuery, MonthlyActivityQueryVariables>(MonthlyActivityDocument, options);
        }
export type MonthlyActivityQueryHookResult = ReturnType<typeof useMonthlyActivityQuery>;
export type MonthlyActivityLazyQueryHookResult = ReturnType<typeof useMonthlyActivityLazyQuery>;
export type MonthlyActivitySuspenseQueryHookResult = ReturnType<typeof useMonthlyActivitySuspenseQuery>;
export type MonthlyActivityQueryResult = Apollo.QueryResult<MonthlyActivityQuery, MonthlyActivityQueryVariables>;