import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckReminderStatusQueryVariables = Types.Exact<{
  igdbId: Types.Scalars['Int']['input'];
}>;


export type CheckReminderStatusQuery = { __typename?: 'Query', checkReminderStatus: boolean };


export const CheckReminderStatusDocument = gql`
    query CheckReminderStatus($igdbId: Int!) {
  checkReminderStatus(igdbId: $igdbId)
}
    `;

/**
 * __useCheckReminderStatusQuery__
 *
 * To run a query within a React component, call `useCheckReminderStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckReminderStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckReminderStatusQuery({
 *   variables: {
 *      igdbId: // value for 'igdbId'
 *   },
 * });
 */
export function useCheckReminderStatusQuery(baseOptions: Apollo.QueryHookOptions<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>(CheckReminderStatusDocument, options);
      }
export function useCheckReminderStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>(CheckReminderStatusDocument, options);
        }
export function useCheckReminderStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>(CheckReminderStatusDocument, options);
        }
export type CheckReminderStatusQueryHookResult = ReturnType<typeof useCheckReminderStatusQuery>;
export type CheckReminderStatusLazyQueryHookResult = ReturnType<typeof useCheckReminderStatusLazyQuery>;
export type CheckReminderStatusSuspenseQueryHookResult = ReturnType<typeof useCheckReminderStatusSuspenseQuery>;
export type CheckReminderStatusQueryResult = Apollo.QueryResult<CheckReminderStatusQuery, CheckReminderStatusQueryVariables>;