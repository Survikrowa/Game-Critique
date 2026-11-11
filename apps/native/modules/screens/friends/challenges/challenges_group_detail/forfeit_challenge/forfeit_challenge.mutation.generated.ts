import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type ForfeitChallengeMutationVariables = Types.Exact<{
  challengeId: Types.Scalars["Int"]["input"];
}>;

export type ForfeitChallengeMutation = {
  __typename?: "Mutation";
  forfeitChallenge: {
    __typename?: "Challenge";
    id: string;
    status: Types.ChallengeStatus;
  };
};

export const ForfeitChallengeDocument = gql`
  mutation ForfeitChallenge($challengeId: Int!) {
    forfeitChallenge(challengeId: $challengeId) {
      id
      status
    }
  }
`;
export type ForfeitChallengeMutationFn = Apollo.MutationFunction<
  ForfeitChallengeMutation,
  ForfeitChallengeMutationVariables
>;

/**
 * __useForfeitChallengeMutation__
 *
 * To run a mutation, you first call `useForfeitChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForfeitChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forfeitChallengeMutation, { data, loading, error }] = useForfeitChallengeMutation({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useForfeitChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForfeitChallengeMutation,
    ForfeitChallengeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForfeitChallengeMutation,
    ForfeitChallengeMutationVariables
  >(ForfeitChallengeDocument, options);
}
export type ForfeitChallengeMutationHookResult = ReturnType<
  typeof useForfeitChallengeMutation
>;
export type ForfeitChallengeMutationResult =
  Apollo.MutationResult<ForfeitChallengeMutation>;
export type ForfeitChallengeMutationOptions = Apollo.BaseMutationOptions<
  ForfeitChallengeMutation,
  ForfeitChallengeMutationVariables
>;
