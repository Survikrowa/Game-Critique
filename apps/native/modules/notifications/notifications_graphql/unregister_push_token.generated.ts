import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnregisterPushTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type UnregisterPushTokenMutation = { __typename?: 'Mutation', unregisterPushToken: boolean };


export const UnregisterPushTokenDocument = gql`
    mutation UnregisterPushToken($token: String!) {
  unregisterPushToken(token: $token)
}
    `;
export type UnregisterPushTokenMutationFn = Apollo.MutationFunction<UnregisterPushTokenMutation, UnregisterPushTokenMutationVariables>;

/**
 * __useUnregisterPushTokenMutation__
 *
 * To run a mutation, you first call `useUnregisterPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterPushTokenMutation, { data, loading, error }] = useUnregisterPushTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUnregisterPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<UnregisterPushTokenMutation, UnregisterPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnregisterPushTokenMutation, UnregisterPushTokenMutationVariables>(UnregisterPushTokenDocument, options);
      }
export type UnregisterPushTokenMutationHookResult = ReturnType<typeof useUnregisterPushTokenMutation>;
export type UnregisterPushTokenMutationResult = Apollo.MutationResult<UnregisterPushTokenMutation>;
export type UnregisterPushTokenMutationOptions = Apollo.BaseMutationOptions<UnregisterPushTokenMutation, UnregisterPushTokenMutationVariables>;