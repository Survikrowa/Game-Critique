import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ConfirmChallengeCompletionMutationVariables = Types.Exact<{
  challengeId: Types.Scalars["Int"]["input"];
}>;

export type ConfirmChallengeCompletionMutation = {
  __typename?: "Mutation";
  confirmChallengeCompletion: {
    __typename?: "Challenge";
    id: string;
    status: Types.ChallengeStatus;
  };
};

export const ConfirmChallengeCompletionDocument = gql`
  mutation ConfirmChallengeCompletion($challengeId: Int!) {
    confirmChallengeCompletion(challengeId: $challengeId) {
      id
      status
    }
  }
`;
export type ConfirmChallengeCompletionMutationFn = Apollo.MutationFunction<
  ConfirmChallengeCompletionMutation,
  ConfirmChallengeCompletionMutationVariables
>;

/**
 * __useConfirmChallengeCompletionMutation__
 *
 * To run a mutation, you first call `useConfirmChallengeCompletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmChallengeCompletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmChallengeCompletionMutation, { data, loading, error }] = useConfirmChallengeCompletionMutation({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useConfirmChallengeCompletionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmChallengeCompletionMutation,
    ConfirmChallengeCompletionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmChallengeCompletionMutation,
    ConfirmChallengeCompletionMutationVariables
  >(ConfirmChallengeCompletionDocument, options);
}
export type ConfirmChallengeCompletionMutationHookResult = ReturnType<
  typeof useConfirmChallengeCompletionMutation
>;
export type ConfirmChallengeCompletionMutationResult =
  Apollo.MutationResult<ConfirmChallengeCompletionMutation>;
export type ConfirmChallengeCompletionMutationOptions =
  Apollo.BaseMutationOptions<
    ConfirmChallengeCompletionMutation,
    ConfirmChallengeCompletionMutationVariables
  >;
