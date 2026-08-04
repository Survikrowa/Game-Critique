import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchGameRatingsMutationVariables = Types.Exact<{
  hltbId: Types.Scalars['Float']['input'];
}>;


export type FetchGameRatingsMutation = { __typename?: 'Mutation', fetchGameRatings: { __typename?: 'GameRatingObject', aggregatedRating?: number | null, aggregatedCount?: number | null, igdbRating?: number | null, igdbRatingCount?: number | null, igdbUrl?: string | null } };


export const FetchGameRatingsDocument = gql`
    mutation FetchGameRatings($hltbId: Float!) {
  fetchGameRatings(hltbId: $hltbId) {
    aggregatedRating
    aggregatedCount
    igdbRating
    igdbRatingCount
    igdbUrl
  }
}
    `;
export type FetchGameRatingsMutationFn = Apollo.MutationFunction<FetchGameRatingsMutation, FetchGameRatingsMutationVariables>;

/**
 * __useFetchGameRatingsMutation__
 *
 * To run a mutation, you first call `useFetchGameRatingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchGameRatingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchGameRatingsMutation, { data, loading, error }] = useFetchGameRatingsMutation({
 *   variables: {
 *      hltbId: // value for 'hltbId'
 *   },
 * });
 */
export function useFetchGameRatingsMutation(baseOptions?: Apollo.MutationHookOptions<FetchGameRatingsMutation, FetchGameRatingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchGameRatingsMutation, FetchGameRatingsMutationVariables>(FetchGameRatingsDocument, options);
      }
export type FetchGameRatingsMutationHookResult = ReturnType<typeof useFetchGameRatingsMutation>;
export type FetchGameRatingsMutationResult = Apollo.MutationResult<FetchGameRatingsMutation>;
export type FetchGameRatingsMutationOptions = Apollo.BaseMutationOptions<FetchGameRatingsMutation, FetchGameRatingsMutationVariables>;