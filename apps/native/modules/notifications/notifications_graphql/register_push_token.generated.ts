import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegisterPushTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  platform: Types.Scalars['String']['input'];
}>;


export type RegisterPushTokenMutation = { __typename?: 'Mutation', registerPushToken: boolean };


export const RegisterPushTokenDocument = gql`
    mutation RegisterPushToken($token: String!, $platform: String!) {
  registerPushToken(token: $token, platform: $platform)
}
    `;
export type RegisterPushTokenMutationFn = Apollo.MutationFunction<RegisterPushTokenMutation, RegisterPushTokenMutationVariables>;

/**
 * __useRegisterPushTokenMutation__
 *
 * To run a mutation, you first call `useRegisterPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerPushTokenMutation, { data, loading, error }] = useRegisterPushTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      platform: // value for 'platform'
 *   },
 * });
 */
export function useRegisterPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterPushTokenMutation, RegisterPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterPushTokenMutation, RegisterPushTokenMutationVariables>(RegisterPushTokenDocument, options);
      }
export type RegisterPushTokenMutationHookResult = ReturnType<typeof useRegisterPushTokenMutation>;
export type RegisterPushTokenMutationResult = Apollo.MutationResult<RegisterPushTokenMutation>;
export type RegisterPushTokenMutationOptions = Apollo.BaseMutationOptions<RegisterPushTokenMutation, RegisterPushTokenMutationVariables>;