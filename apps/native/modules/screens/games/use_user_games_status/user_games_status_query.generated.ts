import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserGamesStatusQueryQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  status: Types.GameStatus;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filters?: Types.InputMaybe<Types.FiltersGameStatus>;
  sort: Types.SortOptionsArg;
}>;


export type UserGamesStatusQueryQuery = { __typename?: 'Query', userGamesStatus: { __typename?: 'UserGamesStatusResponseWithPaginationDTO', userGamesStatus: Array<{ __typename?: 'UserGamesStatusResponseDTO', id: number, achievementsCompleted: boolean, status: Types.GameStatus, score?: string | null, game: { __typename?: 'GameWithAllDataDTO', id: number, hltbId: number, name: string, cover?: { __typename?: 'CoverDTO', id: number, bigUrl: string } | null }, platform: { __typename?: 'PlatformDTO', name: string } }>, pagination: { __typename?: 'PaginationDTO', hasMore: boolean, hasPrevious: boolean, take: number, skip: number } } };


export const UserGamesStatusQueryDocument = gql`
    query UserGamesStatusQuery($take: Float, $skip: Float, $status: GameStatus!, $search: String, $filters: FiltersGameStatus, $sort: SortOptionsArg!) {
  userGamesStatus(
    take: $take
    skip: $skip
    status: $status
    search: $search
    filters: $filters
    sort: $sort
  ) {
    userGamesStatus {
      id
      achievementsCompleted
      game {
        id
        hltbId
        name
        cover {
          id
          bigUrl
        }
      }
      status
      platform {
        name
      }
      score
    }
    pagination {
      hasMore
      hasPrevious
      take
      skip
    }
  }
}
    `;

/**
 * __useUserGamesStatusQueryQuery__
 *
 * To run a query within a React component, call `useUserGamesStatusQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGamesStatusQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGamesStatusQueryQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      status: // value for 'status'
 *      search: // value for 'search'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUserGamesStatusQueryQuery(baseOptions: Apollo.QueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
      }
export function useUserGamesStatusQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
        }
export function useUserGamesStatusQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>(UserGamesStatusQueryDocument, options);
        }
export type UserGamesStatusQueryQueryHookResult = ReturnType<typeof useUserGamesStatusQueryQuery>;
export type UserGamesStatusQueryLazyQueryHookResult = ReturnType<typeof useUserGamesStatusQueryLazyQuery>;
export type UserGamesStatusQuerySuspenseQueryHookResult = ReturnType<typeof useUserGamesStatusQuerySuspenseQuery>;
export type UserGamesStatusQueryQueryResult = Apollo.QueryResult<UserGamesStatusQueryQuery, UserGamesStatusQueryQueryVariables>;