import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCollectionMutationVariables = Types.Exact<{
  collection: Types.NewCollectionDto;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createNewCollection: { __typename?: 'CollectionDTO', name: string, description: string } };


export const CreateCollectionDocument = gql`
    mutation CreateCollection($collection: NewCollectionDTO!) {
  createNewCollection(collection: $collection) {
    name
    description
  }
}
    `;
export type CreateCollectionMutationFn = Apollo.MutationFunction<CreateCollectionMutation, CreateCollectionMutationVariables>;

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useCreateCollectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCollectionMutation, CreateCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument, options);
      }
export type CreateCollectionMutationHookResult = ReturnType<typeof useCreateCollectionMutation>;
export type CreateCollectionMutationResult = Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<CreateCollectionMutation, CreateCollectionMutationVariables>;