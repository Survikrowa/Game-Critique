import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNotificationPreferencesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNotificationPreferencesQuery = { __typename?: 'Query', getNotificationPreferences?: { __typename?: 'NotificationPreferencesObject', friendActivity: boolean, friendInvites: boolean, weeklySummary: boolean, releaseReminders: boolean } | null };


export const GetNotificationPreferencesDocument = gql`
    query GetNotificationPreferences {
  getNotificationPreferences {
    friendActivity
    friendInvites
    weeklySummary
    releaseReminders
  }
}
    `;

/**
 * __useGetNotificationPreferencesQuery__
 *
 * To run a query within a React component, call `useGetNotificationPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationPreferencesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>(GetNotificationPreferencesDocument, options);
      }
export function useGetNotificationPreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>(GetNotificationPreferencesDocument, options);
        }
export function useGetNotificationPreferencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>(GetNotificationPreferencesDocument, options);
        }
export type GetNotificationPreferencesQueryHookResult = ReturnType<typeof useGetNotificationPreferencesQuery>;
export type GetNotificationPreferencesLazyQueryHookResult = ReturnType<typeof useGetNotificationPreferencesLazyQuery>;
export type GetNotificationPreferencesSuspenseQueryHookResult = ReturnType<typeof useGetNotificationPreferencesSuspenseQuery>;
export type GetNotificationPreferencesQueryResult = Apollo.QueryResult<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>;