import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserFriendGamesStatusQueryQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
  take?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  status: Types.GameStatus;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filters?: Types.InputMaybe<Types.FiltersGameStatus>;
  sort: Types.SortOptionsArg;
}>;


export type UserFriendGamesStatusQueryQuery = { __typename?: 'Query', userFriendGamesStatus: { __typename?: 'UserFriendGamesStatusResponseWithPaginationDTO', userGamesStatus: Array<{ __typename?: 'UserGamesStatusResponseDTO', id: number, status: Types.GameStatus, score?: string | null, game: { __typename?: 'GameWithAllDataDTO', id: number, hltbId: number, name: string, cover?: { __typename?: 'CoverDTO', id: number, bigUrl: string } | null }, platform: { __typename?: 'PlatformDTO', name: string } }>, pagination: { __typename?: 'PaginationDTO', hasMore: boolean, hasPrevious: boolean, take: number, skip: number } } };


export const UserFriendGamesStatusQueryDocument = gql`
    query UserFriendGamesStatusQuery($oauthId: String!, $take: Float, $skip: Float, $status: GameStatus!, $search: String, $filters: FiltersGameStatus, $sort: SortOptionsArg!) {
  userFriendGamesStatus(
    oauthId: $oauthId
    take: $take
    skip: $skip
    status: $status
    search: $search
    filters: $filters
    sort: $sort
  ) {
    userGamesStatus {
      id
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
 * __useUserFriendGamesStatusQueryQuery__
 *
 * To run a query within a React component, call `useUserFriendGamesStatusQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFriendGamesStatusQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFriendGamesStatusQueryQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      status: // value for 'status'
 *      search: // value for 'search'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUserFriendGamesStatusQueryQuery(baseOptions: Apollo.QueryHookOptions<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>(UserFriendGamesStatusQueryDocument, options);
      }
export function useUserFriendGamesStatusQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>(UserFriendGamesStatusQueryDocument, options);
        }
export function useUserFriendGamesStatusQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>(UserFriendGamesStatusQueryDocument, options);
        }
export type UserFriendGamesStatusQueryQueryHookResult = ReturnType<typeof useUserFriendGamesStatusQueryQuery>;
export type UserFriendGamesStatusQueryLazyQueryHookResult = ReturnType<typeof useUserFriendGamesStatusQueryLazyQuery>;
export type UserFriendGamesStatusQuerySuspenseQueryHookResult = ReturnType<typeof useUserFriendGamesStatusQuerySuspenseQuery>;
export type UserFriendGamesStatusQueryQueryResult = Apollo.QueryResult<UserFriendGamesStatusQueryQuery, UserFriendGamesStatusQueryQueryVariables>;