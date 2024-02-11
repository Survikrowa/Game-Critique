import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertGameStatusMutationVariables = Types.Exact<{
  input: Types.UpsertGameStatusArgsDto;
}>;


export type UpsertGameStatusMutation = { __typename?: 'Mutation', upsertGameStatus: { __typename?: 'GameStatusSuccessResponseDTO', message: string } };


export const UpsertGameStatusDocument = gql`
    mutation UpsertGameStatus($input: UpsertGameStatusArgsDTO!) {
  upsertGameStatus(upsertGameStatusArgs: $input) {
    message
  }
}
    `;
export type UpsertGameStatusMutationFn = Apollo.MutationFunction<UpsertGameStatusMutation, UpsertGameStatusMutationVariables>;

/**
 * __useUpsertGameStatusMutation__
 *
 * To run a mutation, you first call `useUpsertGameStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertGameStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertGameStatusMutation, { data, loading, error }] = useUpsertGameStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertGameStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpsertGameStatusMutation, UpsertGameStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertGameStatusMutation, UpsertGameStatusMutationVariables>(UpsertGameStatusDocument, options);
      }
export type UpsertGameStatusMutationHookResult = ReturnType<typeof useUpsertGameStatusMutation>;
export type UpsertGameStatusMutationResult = Apollo.MutationResult<UpsertGameStatusMutation>;
export type UpsertGameStatusMutationOptions = Apollo.BaseMutationOptions<UpsertGameStatusMutation, UpsertGameStatusMutationVariables>;