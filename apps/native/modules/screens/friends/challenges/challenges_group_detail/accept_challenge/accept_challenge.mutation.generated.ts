import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AcceptChallengeMutationVariables = Types.Exact<{
  challengeId: Types.Scalars["Int"]["input"];
}>;

export type AcceptChallengeMutation = {
  __typename?: "Mutation";
  acceptChallenge: {
    __typename?: "Challenge";
    id: string;
    status: Types.ChallengeStatus;
  };
};

export const AcceptChallengeDocument = gql`
  mutation AcceptChallenge($challengeId: Int!) {
    acceptChallenge(challengeId: $challengeId) {
      id
      status
    }
  }
`;
export type AcceptChallengeMutationFn = Apollo.MutationFunction<
  AcceptChallengeMutation,
  AcceptChallengeMutationVariables
>;

/**
 * __useAcceptChallengeMutation__
 *
 * To run a mutation, you first call `useAcceptChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptChallengeMutation, { data, loading, error }] = useAcceptChallengeMutation({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useAcceptChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptChallengeMutation,
    AcceptChallengeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AcceptChallengeMutation,
    AcceptChallengeMutationVariables
  >(AcceptChallengeDocument, options);
}
export type AcceptChallengeMutationHookResult = ReturnType<
  typeof useAcceptChallengeMutation
>;
export type AcceptChallengeMutationResult =
  Apollo.MutationResult<AcceptChallengeMutation>;
export type AcceptChallengeMutationOptions = Apollo.BaseMutationOptions<
  AcceptChallengeMutation,
  AcceptChallengeMutationVariables
>;
