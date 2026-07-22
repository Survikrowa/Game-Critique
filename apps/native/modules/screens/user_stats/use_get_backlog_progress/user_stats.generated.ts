import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BacklogProgressQueryVariables = Types.Exact<{
  year: Types.Scalars['Int']['input'];
}>;


export type BacklogProgressQuery = { __typename?: 'Query', backlogProgress: { __typename?: 'BacklogProgressDTO', completed: number, added: number, ratio: number } };


export const BacklogProgressDocument = gql`
    query BacklogProgress($year: Int!) {
  backlogProgress(year: $year) {
    completed
    added
    ratio
  }
}
    `;

/**
 * __useBacklogProgressQuery__
 *
 * To run a query within a React component, call `useBacklogProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useBacklogProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBacklogProgressQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useBacklogProgressQuery(baseOptions: Apollo.QueryHookOptions<BacklogProgressQuery, BacklogProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BacklogProgressQuery, BacklogProgressQueryVariables>(BacklogProgressDocument, options);
      }
export function useBacklogProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BacklogProgressQuery, BacklogProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BacklogProgressQuery, BacklogProgressQueryVariables>(BacklogProgressDocument, options);
        }
export function useBacklogProgressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BacklogProgressQuery, BacklogProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BacklogProgressQuery, BacklogProgressQueryVariables>(BacklogProgressDocument, options);
        }
export type BacklogProgressQueryHookResult = ReturnType<typeof useBacklogProgressQuery>;
export type BacklogProgressLazyQueryHookResult = ReturnType<typeof useBacklogProgressLazyQuery>;
export type BacklogProgressSuspenseQueryHookResult = ReturnType<typeof useBacklogProgressSuspenseQuery>;
export type BacklogProgressQueryResult = Apollo.QueryResult<BacklogProgressQuery, BacklogProgressQueryVariables>;
