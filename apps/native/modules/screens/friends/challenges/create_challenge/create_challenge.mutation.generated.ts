import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateChallengeMutationVariables = Types.Exact<{
  groupId: Types.Scalars['Int']['input'];
  recipientOauthId: Types.Scalars['String']['input'];
  input: Types.CreateChallengeInput;
}>;


export type CreateChallengeMutation = { __typename?: 'Mutation', createChallenge: { __typename?: 'Challenge', id: string, status: Types.ChallengeStatus } };


export const CreateChallengeDocument = gql`
    mutation CreateChallenge($groupId: Int!, $recipientOauthId: String!, $input: CreateChallengeInput!) {
  createChallenge(
    groupId: $groupId
    recipientOauthId: $recipientOauthId
    input: $input
  ) {
    id
    status
  }
}
    `;
export type CreateChallengeMutationFn = Apollo.MutationFunction<CreateChallengeMutation, CreateChallengeMutationVariables>;

/**
 * __useCreateChallengeMutation__
 *
 * To run a mutation, you first call `useCreateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeMutation, { data, loading, error }] = useCreateChallengeMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      recipientOauthId: // value for 'recipientOauthId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChallengeMutation(baseOptions?: Apollo.MutationHookOptions<CreateChallengeMutation, CreateChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChallengeMutation, CreateChallengeMutationVariables>(CreateChallengeDocument, options);
      }
export type CreateChallengeMutationHookResult = ReturnType<typeof useCreateChallengeMutation>;
export type CreateChallengeMutationResult = Apollo.MutationResult<CreateChallengeMutation>;
export type CreateChallengeMutationOptions = Apollo.BaseMutationOptions<CreateChallengeMutation, CreateChallengeMutationVariables>;