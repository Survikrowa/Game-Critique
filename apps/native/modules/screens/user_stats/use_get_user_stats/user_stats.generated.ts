import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserStatsQueryVariables = Types.Exact<{
  type: Types.Scalars['String']['input'];
}>;


export type UserStatsQuery = { __typename?: 'Query', userStats: Array<{ __typename?: 'UserStatsDTO', label: string, value: number }> };


export const UserStatsDocument = gql`
    query UserStats($type: String!) {
  userStats(type: $type) {
    label
    value
  }
}
    `;

/**
 * __useUserStatsQuery__
 *
 * To run a query within a React component, call `useUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUserStatsQuery(baseOptions: Apollo.QueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
      }
export function useUserStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
        }
export function useUserStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
        }
export type UserStatsQueryHookResult = ReturnType<typeof useUserStatsQuery>;
export type UserStatsLazyQueryHookResult = ReturnType<typeof useUserStatsLazyQuery>;
export type UserStatsSuspenseQueryHookResult = ReturnType<typeof useUserStatsSuspenseQuery>;
export type UserStatsQueryResult = Apollo.QueryResult<UserStatsQuery, UserStatsQueryVariables>;