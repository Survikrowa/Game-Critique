import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CompleteChallengeMutationVariables = Types.Exact<{
  challengeId: Types.Scalars["Int"]["input"];
}>;

export type CompleteChallengeMutation = {
  __typename?: "Mutation";
  completeChallenge: {
    __typename?: "Challenge";
    id: string;
    status: Types.ChallengeStatus;
  };
};

export const CompleteChallengeDocument = gql`
  mutation CompleteChallenge($challengeId: Int!) {
    completeChallenge(challengeId: $challengeId) {
      id
      status
    }
  }
`;
export type CompleteChallengeMutationFn = Apollo.MutationFunction<
  CompleteChallengeMutation,
  CompleteChallengeMutationVariables
>;

/**
 * __useCompleteChallengeMutation__
 *
 * To run a mutation, you first call `useCompleteChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeChallengeMutation, { data, loading, error }] = useCompleteChallengeMutation({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useCompleteChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CompleteChallengeMutation,
    CompleteChallengeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CompleteChallengeMutation,
    CompleteChallengeMutationVariables
  >(CompleteChallengeDocument, options);
}
export type CompleteChallengeMutationHookResult = ReturnType<
  typeof useCompleteChallengeMutation
>;
export type CompleteChallengeMutationResult =
  Apollo.MutationResult<CompleteChallengeMutation>;
export type CompleteChallengeMutationOptions = Apollo.BaseMutationOptions<
  CompleteChallengeMutation,
  CompleteChallengeMutationVariables
>;
