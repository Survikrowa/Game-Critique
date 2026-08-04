import * as Types from '../../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectFriendRequestMutationVariables = Types.Exact<{
  senderOauthId: Types.Scalars['String']['input'];
}>;


export type RejectFriendRequestMutation = { __typename?: 'Mutation', rejectFriendRequest: { __typename?: 'FriendRequestResponseDTO', receiverId: string } };


export const RejectFriendRequestDocument = gql`
    mutation RejectFriendRequest($senderOauthId: String!) {
  rejectFriendRequest(senderOauthId: $senderOauthId) {
    receiverId
  }
}
    `;
export type RejectFriendRequestMutationFn = Apollo.MutationFunction<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;

/**
 * __useRejectFriendRequestMutation__
 *
 * To run a mutation, you first call `useRejectFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFriendRequestMutation, { data, loading, error }] = useRejectFriendRequestMutation({
 *   variables: {
 *      senderOauthId: // value for 'senderOauthId'
 *   },
 * });
 */
export function useRejectFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>(RejectFriendRequestDocument, options);
      }
export type RejectFriendRequestMutationHookResult = ReturnType<typeof useRejectFriendRequestMutation>;
export type RejectFriendRequestMutationResult = Apollo.MutationResult<RejectFriendRequestMutation>;
export type RejectFriendRequestMutationOptions = Apollo.BaseMutationOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;