import * as Types from '../../../types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type RolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'RoleDTO', id: number, name: string }> };



export const RolesDocument = `
    query Roles {
  roles {
    id
    name
  }
}
    `;

export const useRolesQuery = <
      TData = RolesQuery,
      TError = unknown
    >(
      variables?: RolesQueryVariables,
      options?: Omit<UseQueryOptions<RolesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RolesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RolesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Roles'] : ['Roles', variables],
    queryFn: fetchData<RolesQuery, RolesQueryVariables>(RolesDocument, variables),
    ...options
  }
    )};
