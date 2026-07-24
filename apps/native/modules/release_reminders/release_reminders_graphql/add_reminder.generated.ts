import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddReminderMutationVariables = Types.Exact<{
  input: Types.AddReminderInput;
}>;


export type AddReminderMutation = { __typename?: 'Mutation', addReminder: { __typename?: 'GameReminderObject', id: number, igdbId: number, gameName: string, gameUrl: string, releaseDate: any, coverUrl?: string | null, createdAt: any } };


export const AddReminderDocument = gql`
    mutation AddReminder($input: AddReminderInput!) {
  addReminder(input: $input) {
    id
    igdbId
    gameName
    gameUrl
    releaseDate
    coverUrl
    createdAt
  }
}
    `;
export type AddReminderMutationFn = Apollo.MutationFunction<AddReminderMutation, AddReminderMutationVariables>;

/**
 * __useAddReminderMutation__
 *
 * To run a mutation, you first call `useAddReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReminderMutation, { data, loading, error }] = useAddReminderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddReminderMutation(baseOptions?: Apollo.MutationHookOptions<AddReminderMutation, AddReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReminderMutation, AddReminderMutationVariables>(AddReminderDocument, options);
      }
export type AddReminderMutationHookResult = ReturnType<typeof useAddReminderMutation>;
export type AddReminderMutationResult = Apollo.MutationResult<AddReminderMutation>;
export type AddReminderMutationOptions = Apollo.BaseMutationOptions<AddReminderMutation, AddReminderMutationVariables>;