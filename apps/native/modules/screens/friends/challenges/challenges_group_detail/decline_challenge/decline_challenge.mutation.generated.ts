import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type DeclineChallengeMutationVariables = Types.Exact<{
  challengeId: Types.Scalars["Int"]["input"];
}>;

export type DeclineChallengeMutation = {
  __typename?: "Mutation";
  declineChallenge: boolean;
};

export const DeclineChallengeDocument = gql`
  mutation DeclineChallenge($challengeId: Int!) {
    declineChallenge(challengeId: $challengeId)
  }
`;
export type DeclineChallengeMutationFn = Apollo.MutationFunction<
  DeclineChallengeMutation,
  DeclineChallengeMutationVariables
>;

/**
 * __useDeclineChallengeMutation__
 *
 * To run a mutation, you first call `useDeclineChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineChallengeMutation, { data, loading, error }] = useDeclineChallengeMutation({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useDeclineChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineChallengeMutation,
    DeclineChallengeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeclineChallengeMutation,
    DeclineChallengeMutationVariables
  >(DeclineChallengeDocument, options);
}
export type DeclineChallengeMutationHookResult = ReturnType<
  typeof useDeclineChallengeMutation
>;
export type DeclineChallengeMutationResult =
  Apollo.MutationResult<DeclineChallengeMutation>;
export type DeclineChallengeMutationOptions = Apollo.BaseMutationOptions<
  DeclineChallengeMutation,
  DeclineChallengeMutationVariables
>;
