import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserGameStatusQueryVariables = Types.Exact<{
  gameStatusId: Types.Scalars['Float']['input'];
}>;


export type UserGameStatusQuery = { __typename?: 'Query', userGameStatus: { __typename?: 'UserGamesStatusResponseDTO', id: number, achievementsCompleted: boolean, status: Types.GameStatus, score?: string | null, review?: string | null, completedIn?: { __typename?: 'GameStatusCompletedInDTO', hours?: number | null, minutes?: number | null, seconds?: number | null } | null, platform: { __typename?: 'PlatformDTO', id: number, name: string }, game: { __typename?: 'GameWithCoversDTO', id: number, name: string, cover?: { __typename?: 'CoverDTO', bigUrl: string } | null } } };


export const UserGameStatusDocument = gql`
    query UserGameStatus($gameStatusId: Float!) {
  userGameStatus(gameStatusId: $gameStatusId) {
    id
    completedIn {
      hours
      minutes
      seconds
    }
    achievementsCompleted
    platform {
      id
      name
    }
    game {
      id
      name
      cover {
        bigUrl
      }
    }
    status
    score
    review
  }
}
    `;

/**
 * __useUserGameStatusQuery__
 *
 * To run a query within a React component, call `useUserGameStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGameStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGameStatusQuery({
 *   variables: {
 *      gameStatusId: // value for 'gameStatusId'
 *   },
 * });
 */
export function useUserGameStatusQuery(baseOptions: Apollo.QueryHookOptions<UserGameStatusQuery, UserGameStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGameStatusQuery, UserGameStatusQueryVariables>(UserGameStatusDocument, options);
      }
export function useUserGameStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGameStatusQuery, UserGameStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGameStatusQuery, UserGameStatusQueryVariables>(UserGameStatusDocument, options);
        }
export function useUserGameStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserGameStatusQuery, UserGameStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserGameStatusQuery, UserGameStatusQueryVariables>(UserGameStatusDocument, options);
        }
export type UserGameStatusQueryHookResult = ReturnType<typeof useUserGameStatusQuery>;
export type UserGameStatusLazyQueryHookResult = ReturnType<typeof useUserGameStatusLazyQuery>;
export type UserGameStatusSuspenseQueryHookResult = ReturnType<typeof useUserGameStatusSuspenseQuery>;
export type UserGameStatusQueryResult = Apollo.QueryResult<UserGameStatusQuery, UserGameStatusQueryVariables>;