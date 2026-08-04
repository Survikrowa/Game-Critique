import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNotificationPreferencesMutationVariables = Types.Exact<{
  input: Types.NotificationPreferencesInput;
}>;


export type UpdateNotificationPreferencesMutation = { __typename?: 'Mutation', updateNotificationPreferences: boolean };


export const UpdateNotificationPreferencesDocument = gql`
    mutation UpdateNotificationPreferences($input: NotificationPreferencesInput!) {
  updateNotificationPreferences(input: $input)
}
    `;
export type UpdateNotificationPreferencesMutationFn = Apollo.MutationFunction<UpdateNotificationPreferencesMutation, UpdateNotificationPreferencesMutationVariables>;

/**
 * __useUpdateNotificationPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationPreferencesMutation, { data, loading, error }] = useUpdateNotificationPreferencesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationPreferencesMutation, UpdateNotificationPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationPreferencesMutation, UpdateNotificationPreferencesMutationVariables>(UpdateNotificationPreferencesDocument, options);
      }
export type UpdateNotificationPreferencesMutationHookResult = ReturnType<typeof useUpdateNotificationPreferencesMutation>;
export type UpdateNotificationPreferencesMutationResult = Apollo.MutationResult<UpdateNotificationPreferencesMutation>;
export type UpdateNotificationPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationPreferencesMutation, UpdateNotificationPreferencesMutationVariables>;