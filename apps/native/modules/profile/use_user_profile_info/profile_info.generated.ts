import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfileInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProfileInfoQuery = { __typename?: 'Query', profileInfo: { __typename?: 'ProfileInfoDTO', avatarUrl: string, name: string, id: number } };


export const ProfileInfoDocument = gql`
    query ProfileInfo {
  profileInfo {
    avatarUrl
    name
    id
  }
}
    `;

/**
 * __useProfileInfoQuery__
 *
 * To run a query within a React component, call `useProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileInfoQuery(baseOptions?: Apollo.QueryHookOptions<ProfileInfoQuery, ProfileInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileInfoQuery, ProfileInfoQueryVariables>(ProfileInfoDocument, options);
      }
export function useProfileInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileInfoQuery, ProfileInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileInfoQuery, ProfileInfoQueryVariables>(ProfileInfoDocument, options);
        }
export function useProfileInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileInfoQuery, ProfileInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileInfoQuery, ProfileInfoQueryVariables>(ProfileInfoDocument, options);
        }
export type ProfileInfoQueryHookResult = ReturnType<typeof useProfileInfoQuery>;
export type ProfileInfoLazyQueryHookResult = ReturnType<typeof useProfileInfoLazyQuery>;
export type ProfileInfoSuspenseQueryHookResult = ReturnType<typeof useProfileInfoSuspenseQuery>;
export type ProfileInfoQueryResult = Apollo.QueryResult<ProfileInfoQuery, ProfileInfoQueryVariables>;