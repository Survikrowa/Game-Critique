import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreateChallengeGroupMutationVariables = Types.Exact<{
  name: Types.Scalars["String"]["input"];
}>;

export type CreateChallengeGroupMutation = {
  __typename?: "Mutation";
  createChallengeGroup: {
    __typename?: "ChallengeGroup";
    id: string;
    name: string;
  };
};

export const CreateChallengeGroupDocument = gql`
  mutation CreateChallengeGroup($name: String!) {
    createChallengeGroup(name: $name) {
      id
      name
    }
  }
`;
export type CreateChallengeGroupMutationFn = Apollo.MutationFunction<
  CreateChallengeGroupMutation,
  CreateChallengeGroupMutationVariables
>;

/**
 * __useCreateChallengeGroupMutation__
 *
 * To run a mutation, you first call `useCreateChallengeGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeGroupMutation, { data, loading, error }] = useCreateChallengeGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateChallengeGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChallengeGroupMutation,
    CreateChallengeGroupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChallengeGroupMutation,
    CreateChallengeGroupMutationVariables
  >(CreateChallengeGroupDocument, options);
}
export type CreateChallengeGroupMutationHookResult = ReturnType<
  typeof useCreateChallengeGroupMutation
>;
export type CreateChallengeGroupMutationResult =
  Apollo.MutationResult<CreateChallengeGroupMutation>;
export type CreateChallengeGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateChallengeGroupMutation,
  CreateChallengeGroupMutationVariables
>;
