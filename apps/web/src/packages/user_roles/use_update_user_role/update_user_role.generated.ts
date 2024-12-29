import * as Types from '../../../types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type UpdateUserRoleMutationVariables = Types.Exact<{
  updateUserRoleInput: Types.UpdateUserRoleInput;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'UpdateUserRoleDTO', success: boolean } };



export const UpdateUserRoleDocument = `
    mutation UpdateUserRole($updateUserRoleInput: UpdateUserRoleInput!) {
  updateUserRole(updateUserRoleInput: $updateUserRoleInput) {
    success
  }
}
    `;

export const useUpdateUserRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserRoleMutation, TError, UpdateUserRoleMutationVariables, TContext>) => {
    
    return useMutation<UpdateUserRoleMutation, TError, UpdateUserRoleMutationVariables, TContext>(
      {
    mutationKey: ['UpdateUserRole'],
    mutationFn: (variables?: UpdateUserRoleMutationVariables) => fetchData<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, variables)(),
    ...options
  }
    )};
