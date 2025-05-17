import * as Types from '../../../../../../../types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type UpdatePlatformDisplayNameMutationVariables = Types.Exact<{
  platformId: Types.Scalars['Float']['input'];
  displayName: Types.Scalars['String']['input'];
}>;


export type UpdatePlatformDisplayNameMutation = { __typename?: 'Mutation', updatePlatformDisplayName: { __typename?: 'UpdatePlatformDisplayNameDTO', platform: { __typename?: 'Platform', id: number, displayName?: string | null } } };



export const UpdatePlatformDisplayNameDocument = `
    mutation UpdatePlatformDisplayName($platformId: Float!, $displayName: String!) {
  updatePlatformDisplayName(platformId: $platformId, displayName: $displayName) {
    platform {
      id
      displayName
    }
  }
}
    `;

export const useUpdatePlatformDisplayNameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePlatformDisplayNameMutation, TError, UpdatePlatformDisplayNameMutationVariables, TContext>) => {
    
    return useMutation<UpdatePlatformDisplayNameMutation, TError, UpdatePlatformDisplayNameMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePlatformDisplayName'],
    mutationFn: (variables?: UpdatePlatformDisplayNameMutationVariables) => fetchData<UpdatePlatformDisplayNameMutation, UpdatePlatformDisplayNameMutationVariables>(UpdatePlatformDisplayNameDocument, variables)(),
    ...options
  }
    )};
