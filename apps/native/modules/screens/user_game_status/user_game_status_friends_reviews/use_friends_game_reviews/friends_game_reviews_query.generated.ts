import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendsGameReviewsQueryVariables = Types.Exact<{
  gameStatusId: Types.Scalars['Float']['input'];
}>;


export type FriendsGameReviewsQuery = { __typename?: 'Query', ownerAndFriendsGameStatusReviews: Array<{ __typename?: 'FriendsGameStatusReviewsDTO', review?: string | null, score?: string | null, profile?: { __typename?: 'ProfileInfoDTO', name?: string | null, avatarUrl: string } | null }> };


export const FriendsGameReviewsDocument = gql`
    query FriendsGameReviews($gameStatusId: Float!) {
  ownerAndFriendsGameStatusReviews(gameStatusId: $gameStatusId) {
    profile {
      name
      avatarUrl
    }
    review
    score
  }
}
    `;

/**
 * __useFriendsGameReviewsQuery__
 *
 * To run a query within a React component, call `useFriendsGameReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsGameReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsGameReviewsQuery({
 *   variables: {
 *      gameStatusId: // value for 'gameStatusId'
 *   },
 * });
 */
export function useFriendsGameReviewsQuery(baseOptions: Apollo.QueryHookOptions<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>(FriendsGameReviewsDocument, options);
      }
export function useFriendsGameReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>(FriendsGameReviewsDocument, options);
        }
export function useFriendsGameReviewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>(FriendsGameReviewsDocument, options);
        }
export type FriendsGameReviewsQueryHookResult = ReturnType<typeof useFriendsGameReviewsQuery>;
export type FriendsGameReviewsLazyQueryHookResult = ReturnType<typeof useFriendsGameReviewsLazyQuery>;
export type FriendsGameReviewsSuspenseQueryHookResult = ReturnType<typeof useFriendsGameReviewsSuspenseQuery>;
export type FriendsGameReviewsQueryResult = Apollo.QueryResult<FriendsGameReviewsQuery, FriendsGameReviewsQueryVariables>;