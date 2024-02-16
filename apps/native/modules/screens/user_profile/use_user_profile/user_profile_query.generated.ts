import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserProfileQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['String']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', user: { __typename?: 'UserDataDTO', id: number, oauthId: string, profile?: { __typename?: 'ProfileInfoDTO', name?: string | null, avatarUrl: string } | null, gamesStatus?: Array<{ __typename?: 'GameStatusDTO', achievementsCompleted: boolean }> | null, userActivity?: Array<{ __typename?: 'UserActivityDTO', activityType: Types.GameStatus, updatedAt: any, formattedUpdatedAt: string, game?: { __typename?: 'GameDTO', name: string } | null }> | null } };


export const UserProfileDocument = gql`
    query UserProfile($oauthId: String!) {
  user(oauthId: $oauthId) {
    id
    oauthId
    profile {
      name
      avatarUrl
    }
    gamesStatus {
      achievementsCompleted
    }
    userActivity {
      activityType
      game {
        name
      }
      updatedAt
      formattedUpdatedAt
    }
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export function useUserProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileSuspenseQueryHookResult = ReturnType<typeof useUserProfileSuspenseQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;