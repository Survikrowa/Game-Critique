import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyGameStatusForGameQueryVariables = Types.Exact<{
  gameId: Types.Scalars['Float']['input'];
}>;


export type MyGameStatusForGameQuery = { __typename?: 'Query', myGameStatusForGame?: { __typename?: 'MyGameStatusForGameDTO', id: number, status: Types.GameStatus } | null };


export const MyGameStatusForGameDocument = gql`
    query MyGameStatusForGame($gameId: Float!) {
  myGameStatusForGame(gameId: $gameId) {
    id
    status
  }
}
    `;

/**
 * __useMyGameStatusForGameQuery__
 *
 * To run a query within a React component, call `useMyGameStatusForGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGameStatusForGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGameStatusForGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useMyGameStatusForGameQuery(baseOptions: Apollo.QueryHookOptions<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>(MyGameStatusForGameDocument, options);
      }
export function useMyGameStatusForGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>(MyGameStatusForGameDocument, options);
        }
export function useMyGameStatusForGameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>(MyGameStatusForGameDocument, options);
        }
export type MyGameStatusForGameQueryHookResult = ReturnType<typeof useMyGameStatusForGameQuery>;
export type MyGameStatusForGameLazyQueryHookResult = ReturnType<typeof useMyGameStatusForGameLazyQuery>;
export type MyGameStatusForGameSuspenseQueryHookResult = ReturnType<typeof useMyGameStatusForGameSuspenseQuery>;
export type MyGameStatusForGameQueryResult = Apollo.QueryResult<MyGameStatusForGameQuery, MyGameStatusForGameQueryVariables>;