import * as Types from '../../../../../types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type GamesQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type GamesQuery = { __typename?: 'Query', games: { __typename?: 'PaginatedGames', items: Array<{ __typename?: 'GameWithAllDataDTO', id: number, name: string, slug: string, hltbId: number }>, pagination: { __typename?: 'PaginationDTO', total: number, take: number, skip: number } } };



export const GamesDocument = `
    query Games($search: String, $take: Float, $skip: Float) {
  games(take: $take, skip: $skip, search: $search) {
    items {
      id
      name
      slug
      hltbId
    }
    pagination {
      total
      take
      skip
    }
  }
}
    `;

export const useGamesQuery = <
      TData = GamesQuery,
      TError = unknown
    >(
      variables?: GamesQueryVariables,
      options?: Omit<UseQueryOptions<GamesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GamesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GamesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Games'] : ['Games', variables],
    queryFn: fetchData<GamesQuery, GamesQueryVariables>(GamesDocument, variables),
    ...options
  }
    )};
