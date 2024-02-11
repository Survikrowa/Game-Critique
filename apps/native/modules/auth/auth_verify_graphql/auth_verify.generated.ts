import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyOrCreateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyOrCreateQuery = { __typename?: 'Query', verify: { __typename?: 'AuthUserVerification', authorized: boolean } };


export const VerifyOrCreateDocument = gql`
    query VerifyOrCreate {
  verify {
    authorized
  }
}
    `;

/**
 * __useVerifyOrCreateQuery__
 *
 * To run a query within a React component, call `useVerifyOrCreateQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyOrCreateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyOrCreateQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyOrCreateQuery(baseOptions?: Apollo.QueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
      }
export function useVerifyOrCreateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
        }
export function useVerifyOrCreateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
        }
export type VerifyOrCreateQueryHookResult = ReturnType<typeof useVerifyOrCreateQuery>;
export type VerifyOrCreateLazyQueryHookResult = ReturnType<typeof useVerifyOrCreateLazyQuery>;
export type VerifyOrCreateSuspenseQueryHookResult = ReturnType<typeof useVerifyOrCreateSuspenseQuery>;
export type VerifyOrCreateQueryResult = Apollo.QueryResult<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>;