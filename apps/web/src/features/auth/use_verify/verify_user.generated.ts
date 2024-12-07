import * as Types from '../../../types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type VerifyUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyUserQuery = { __typename?: 'Query', verify: { __typename?: 'AuthUserVerification', authorized: boolean, role?: Types.Roles | null } };



export const VerifyUserDocument = `
    query VerifyUser {
  verify {
    authorized
    role
  }
}
    `;

export const useVerifyUserQuery = <
      TData = VerifyUserQuery,
      TError = unknown
    >(
      variables?: VerifyUserQueryVariables,
      options?: Omit<UseQueryOptions<VerifyUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<VerifyUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<VerifyUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['VerifyUser'] : ['VerifyUser', variables],
    queryFn: fetchData<VerifyUserQuery, VerifyUserQueryVariables>(VerifyUserDocument, variables),
    ...options
  }
    )};
