import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewGamesStatusMutationVariables = Types.Exact<{
  input: Types.CreateGameStatusArgsDto;
}>;


export type CreateNewGamesStatusMutation = { __typename?: 'Mutation', createGameStatus: { __typename?: 'GameStatusSuccessResponseDTO', message: string } };


export const CreateNewGamesStatusDocument = gql`
    mutation CreateNewGamesStatus($input: CreateGameStatusArgsDTO!) {
  createGameStatus(createGameStatusArgs: $input) {
    message
  }
}
    `;
export type CreateNewGamesStatusMutationFn = Apollo.MutationFunction<CreateNewGamesStatusMutation, CreateNewGamesStatusMutationVariables>;

/**
 * __useCreateNewGamesStatusMutation__
 *
 * To run a mutation, you first call `useCreateNewGamesStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewGamesStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewGamesStatusMutation, { data, loading, error }] = useCreateNewGamesStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewGamesStatusMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewGamesStatusMutation, CreateNewGamesStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewGamesStatusMutation, CreateNewGamesStatusMutationVariables>(CreateNewGamesStatusDocument, options);
      }
export type CreateNewGamesStatusMutationHookResult = ReturnType<typeof useCreateNewGamesStatusMutation>;
export type CreateNewGamesStatusMutationResult = Apollo.MutationResult<CreateNewGamesStatusMutation>;
export type CreateNewGamesStatusMutationOptions = Apollo.BaseMutationOptions<CreateNewGamesStatusMutation, CreateNewGamesStatusMutationVariables>;