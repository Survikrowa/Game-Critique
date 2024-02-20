import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserGamesStatusQueryQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
  take?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  status: Types.GameStatus;
}>;


export type UserGamesStatusQueryQuery = { __typename?: 'Query', userGamesStatus: { __typename?: 'UserGamesStatusResponseWithPaginationDTO', userGamesStatus: Array<{ __typename?: 'UserGamesStatusResponseDTO', id: number, status: Types.GameStatus, score?: string | null, game: { __typename?: 'GameWithAllDataDTO', hltbId: number, name: string, cover?: { __typename?: 'CoverDTO', bigUrl: string } | null }, platform: { __typename?: 'PlatformDTO', name: string } }>, pagination: { __typename?: 'PaginationDTO', hasMore: boolean, hasPrevious: boolean } } };


export const UserGamesStatusQueryDocument = gql`
    query UserGamesStatusQuery($oauthId: String!, $take: Float, $skip: Float, $status: GameStatus!) {
  userGamesStatus(oauthId: $oauthId, take: $take, skip: $skip, status: $status) {
    userGamesStatus {
      id
      game {
        hltbId
        name
        cover {
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
 *      oauthId: // value for 'oauthId'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      status: // value for 'status'
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