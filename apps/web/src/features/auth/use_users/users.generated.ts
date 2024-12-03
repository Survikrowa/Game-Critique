import * as Types from '../../../types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type UsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserDataDTO', id: number }> };



export const UsersDocument = `
    query Users {
  users {
    id
  }
}
    `;

export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      variables?: UsersQueryVariables,
      options?: Omit<UseQueryOptions<UsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Users'] : ['Users', variables],
    queryFn: fetchData<UsersQuery, UsersQueryVariables>(UsersDocument, variables),
    ...options
  }
    )};
