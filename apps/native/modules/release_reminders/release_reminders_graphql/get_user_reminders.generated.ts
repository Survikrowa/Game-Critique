import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserRemindersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserRemindersQuery = { __typename?: 'Query', getUserReminders: Array<{ __typename?: 'GameReminderObject', id: number, igdbId: number, gameName: string, gameUrl: string, releaseDate: any, coverUrl?: string | null, createdAt: any }> };


export const GetUserRemindersDocument = gql`
    query GetUserReminders {
  getUserReminders {
    id
    igdbId
    gameName
    gameUrl
    releaseDate
    coverUrl
    createdAt
  }
}
    `;

/**
 * __useGetUserRemindersQuery__
 *
 * To run a query within a React component, call `useGetUserRemindersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRemindersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRemindersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserRemindersQuery(baseOptions?: Apollo.QueryHookOptions<GetUserRemindersQuery, GetUserRemindersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRemindersQuery, GetUserRemindersQueryVariables>(GetUserRemindersDocument, options);
      }
export function useGetUserRemindersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRemindersQuery, GetUserRemindersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRemindersQuery, GetUserRemindersQueryVariables>(GetUserRemindersDocument, options);
        }
export function useGetUserRemindersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserRemindersQuery, GetUserRemindersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserRemindersQuery, GetUserRemindersQueryVariables>(GetUserRemindersDocument, options);
        }
export type GetUserRemindersQueryHookResult = ReturnType<typeof useGetUserRemindersQuery>;
export type GetUserRemindersLazyQueryHookResult = ReturnType<typeof useGetUserRemindersLazyQuery>;
export type GetUserRemindersSuspenseQueryHookResult = ReturnType<typeof useGetUserRemindersSuspenseQuery>;
export type GetUserRemindersQueryResult = Apollo.QueryResult<GetUserRemindersQuery, GetUserRemindersQueryVariables>;