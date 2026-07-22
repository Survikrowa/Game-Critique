import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StreakQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StreakQuery = { __typename?: 'Query', streak: { __typename?: 'StreakDTO', currentStreak: number, longestStreak: number } };


export const StreakDocument = gql`
    query Streak {
  streak {
    currentStreak
    longestStreak
  }
}
    `;

/**
 * __useStreakQuery__
 *
 * To run a query within a React component, call `useStreakQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreakQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreakQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreakQuery(baseOptions?: Apollo.QueryHookOptions<StreakQuery, StreakQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreakQuery, StreakQueryVariables>(StreakDocument, options);
      }
export function useStreakLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreakQuery, StreakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreakQuery, StreakQueryVariables>(StreakDocument, options);
        }
export function useStreakSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StreakQuery, StreakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreakQuery, StreakQueryVariables>(StreakDocument, options);
        }
export type StreakQueryHookResult = ReturnType<typeof useStreakQuery>;
export type StreakLazyQueryHookResult = ReturnType<typeof useStreakLazyQuery>;
export type StreakSuspenseQueryHookResult = ReturnType<typeof useStreakSuspenseQuery>;
export type StreakQueryResult = Apollo.QueryResult<StreakQuery, StreakQueryVariables>;