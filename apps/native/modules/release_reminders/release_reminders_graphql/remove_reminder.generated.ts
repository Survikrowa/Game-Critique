import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveReminderMutationVariables = Types.Exact<{
  igdbId: Types.Scalars['Int']['input'];
}>;


export type RemoveReminderMutation = { __typename?: 'Mutation', removeReminder: boolean };


export const RemoveReminderDocument = gql`
    mutation RemoveReminder($igdbId: Int!) {
  removeReminder(igdbId: $igdbId)
}
    `;
export type RemoveReminderMutationFn = Apollo.MutationFunction<RemoveReminderMutation, RemoveReminderMutationVariables>;

/**
 * __useRemoveReminderMutation__
 *
 * To run a mutation, you first call `useRemoveReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReminderMutation, { data, loading, error }] = useRemoveReminderMutation({
 *   variables: {
 *      igdbId: // value for 'igdbId'
 *   },
 * });
 */
export function useRemoveReminderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReminderMutation, RemoveReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReminderMutation, RemoveReminderMutationVariables>(RemoveReminderDocument, options);
      }
export type RemoveReminderMutationHookResult = ReturnType<typeof useRemoveReminderMutation>;
export type RemoveReminderMutationResult = Apollo.MutationResult<RemoveReminderMutation>;
export type RemoveReminderMutationOptions = Apollo.BaseMutationOptions<RemoveReminderMutation, RemoveReminderMutationVariables>;