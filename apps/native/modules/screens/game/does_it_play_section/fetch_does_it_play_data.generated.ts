import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchDoesItPlayDataMutationVariables = Types.Exact<{
  hltbId: Types.Scalars['Float']['input'];
}>;


export type FetchDoesItPlayDataMutation = { __typename?: 'Mutation', fetchDoesItPlayData: boolean };


export const FetchDoesItPlayDataDocument = gql`
    mutation FetchDoesItPlayData($hltbId: Float!) {
  fetchDoesItPlayData(hltbId: $hltbId)
}
    `;
export type FetchDoesItPlayDataMutationFn = Apollo.MutationFunction<FetchDoesItPlayDataMutation, FetchDoesItPlayDataMutationVariables>;

/**
 * __useFetchDoesItPlayDataMutation__
 *
 * To run a mutation, you first call `useFetchDoesItPlayDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchDoesItPlayDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchDoesItPlayDataMutation, { data, loading, error }] = useFetchDoesItPlayDataMutation({
 *   variables: {
 *      hltbId: // value for 'hltbId'
 *   },
 * });
 */
export function useFetchDoesItPlayDataMutation(baseOptions?: Apollo.MutationHookOptions<FetchDoesItPlayDataMutation, FetchDoesItPlayDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchDoesItPlayDataMutation, FetchDoesItPlayDataMutationVariables>(FetchDoesItPlayDataDocument, options);
      }
export type FetchDoesItPlayDataMutationHookResult = ReturnType<typeof useFetchDoesItPlayDataMutation>;
export type FetchDoesItPlayDataMutationResult = Apollo.MutationResult<FetchDoesItPlayDataMutation>;
export type FetchDoesItPlayDataMutationOptions = Apollo.BaseMutationOptions<FetchDoesItPlayDataMutation, FetchDoesItPlayDataMutationVariables>;