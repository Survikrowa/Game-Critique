import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

import * as Types from "../../../../../../../__generated__/types";
const defaultOptions = {} as const;
export type RemoveGameStatusMutationVariables = Types.Exact<{
  gameStatusId: Types.Scalars["Float"]["input"];
}>;

export type RemoveGameStatusMutation = {
  __typename?: "Mutation";
  removeGameStatus: {
    __typename?: "GameStatusSuccessResponseDTO";
    message: string;
  };
};

export const RemoveGameStatusDocument = gql`
  mutation RemoveGameStatus($gameStatusId: Float!) {
    removeGameStatus(gameStatusId: $gameStatusId) {
      message
    }
  }
`;
export type RemoveGameStatusMutationFn = Apollo.MutationFunction<
  RemoveGameStatusMutation,
  RemoveGameStatusMutationVariables
>;

/**
 * __useRemoveGameStatusMutation__
 *
 * To run a mutation, you first call `useRemoveGameStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGameStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGameStatusMutation, { data, loading, error }] = useRemoveGameStatusMutation({
 *   variables: {
 *      gameStatusId: // value for 'gameStatusId'
 *   },
 * });
 */
export function useRemoveGameStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveGameStatusMutation,
    RemoveGameStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveGameStatusMutation,
    RemoveGameStatusMutationVariables
  >(RemoveGameStatusDocument, options);
}
export type RemoveGameStatusMutationHookResult = ReturnType<
  typeof useRemoveGameStatusMutation
>;
export type RemoveGameStatusMutationResult =
  Apollo.MutationResult<RemoveGameStatusMutation>;
export type RemoveGameStatusMutationOptions = Apollo.BaseMutationOptions<
  RemoveGameStatusMutation,
  RemoveGameStatusMutationVariables
>;
