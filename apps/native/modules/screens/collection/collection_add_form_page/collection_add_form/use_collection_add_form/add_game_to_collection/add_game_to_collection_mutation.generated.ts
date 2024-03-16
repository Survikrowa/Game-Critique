import * as Types from '../../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddGameToCollectionMutationVariables = Types.Exact<{
  input: Types.AddGameToCollectionDto;
}>;


export type AddGameToCollectionMutation = { __typename?: 'Mutation', addGameToCollection: { __typename?: 'CollectionMutationResponseDTO', success: boolean } };


export const AddGameToCollectionDocument = gql`
    mutation AddGameToCollection($input: AddGameToCollectionDTO!) {
  addGameToCollection(collection: $input) {
    success
  }
}
    `;
export type AddGameToCollectionMutationFn = Apollo.MutationFunction<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>;

/**
 * __useAddGameToCollectionMutation__
 *
 * To run a mutation, you first call `useAddGameToCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGameToCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGameToCollectionMutation, { data, loading, error }] = useAddGameToCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddGameToCollectionMutation(baseOptions?: Apollo.MutationHookOptions<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>(AddGameToCollectionDocument, options);
      }
export type AddGameToCollectionMutationHookResult = ReturnType<typeof useAddGameToCollectionMutation>;
export type AddGameToCollectionMutationResult = Apollo.MutationResult<AddGameToCollectionMutation>;
export type AddGameToCollectionMutationOptions = Apollo.BaseMutationOptions<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>;