import * as Types from '../../../../../types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type PlatformsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlatformsQuery = { __typename?: 'Query', platforms: { __typename?: 'PlatformsDTO', platforms: Array<{ __typename?: 'Platform', id: number, name: string, displayName?: string | null, slug: string }> } };



export const PlatformsDocument = `
    query Platforms {
  platforms {
    platforms {
      id
      name
      displayName
      slug
    }
  }
}
    `;

export const usePlatformsQuery = <
      TData = PlatformsQuery,
      TError = unknown
    >(
      variables?: PlatformsQueryVariables,
      options?: Omit<UseQueryOptions<PlatformsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PlatformsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PlatformsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Platforms'] : ['Platforms', variables],
    queryFn: fetchData<PlatformsQuery, PlatformsQueryVariables>(PlatformsDocument, variables),
    ...options
  }
    )};
