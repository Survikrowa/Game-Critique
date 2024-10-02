import * as Types from '../../__generated__/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '@/codegen/fetcher';
export type VerifyOrCreateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyOrCreateQuery = { __typename?: 'Query', verify: { __typename?: 'AuthUserVerification', authorized: boolean } };



export const VerifyOrCreateDocument = `
    query VerifyOrCreate {
  verify {
    authorized
  }
}
    `;

export const useVerifyOrCreateQuery = <
      TData = VerifyOrCreateQuery,
      TError = unknown
    >(
      variables?: VerifyOrCreateQueryVariables,
      options?: Omit<UseQueryOptions<VerifyOrCreateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<VerifyOrCreateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<VerifyOrCreateQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['VerifyOrCreate'] : ['VerifyOrCreate', variables],
    queryFn: fetcher<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, variables),
    ...options
  }
    )};

useVerifyOrCreateQuery.document = VerifyOrCreateDocument;

useVerifyOrCreateQuery.getKey = (variables?: VerifyOrCreateQueryVariables) => variables === undefined ? ['VerifyOrCreate'] : ['VerifyOrCreate', variables];


useVerifyOrCreateQuery.fetcher = (variables?: VerifyOrCreateQueryVariables, options?: RequestInit['headers']) => fetcher<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, variables, options);
