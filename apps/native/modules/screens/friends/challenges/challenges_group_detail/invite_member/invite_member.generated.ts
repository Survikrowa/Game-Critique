import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type InviteMemberMutationVariables = Types.Exact<{
  groupId: Types.Scalars["Int"]["input"];
  oauthId: Types.Scalars["String"]["input"];
}>;

export type InviteMemberMutation = {
  __typename?: "Mutation";
  inviteMember: { __typename?: "ChallengeGroup"; id: string; name: string };
};

export const InviteMemberDocument = gql`
  mutation InviteMember($groupId: Int!, $oauthId: String!) {
    inviteMember(groupId: $groupId, oauthId: $oauthId) {
      id
      name
    }
  }
`;
export type InviteMemberMutationFn = Apollo.MutationFunction<
  InviteMemberMutation,
  InviteMemberMutationVariables
>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      oauthId: // value for 'oauthId'
 *   },
 * });
 */
export function useInviteMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteMemberMutation,
    InviteMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InviteMemberMutation,
    InviteMemberMutationVariables
  >(InviteMemberDocument, options);
}
export type InviteMemberMutationHookResult = ReturnType<
  typeof useInviteMemberMutation
>;
export type InviteMemberMutationResult =
  Apollo.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = Apollo.BaseMutationOptions<
  InviteMemberMutation,
  InviteMemberMutationVariables
>;
