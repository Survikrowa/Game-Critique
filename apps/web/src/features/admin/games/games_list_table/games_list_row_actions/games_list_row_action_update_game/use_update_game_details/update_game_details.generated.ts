import * as Types from '../../../../../../../types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchData } from '@/codegen/fetcher';
export type UpdateGameDetailsMutationVariables = Types.Exact<{
  hltbId: Types.Scalars['Float']['input'];
}>;


export type UpdateGameDetailsMutation = { __typename?: 'Mutation', updateGameData: { __typename?: 'UpdateGameDataDTO', hltbId: number, message: string } };



export const UpdateGameDetailsDocument = `
    mutation updateGameDetails($hltbId: Float!) {
  updateGameData(hltbId: $hltbId) {
    hltbId
    message
  }
}
    `;

export const useUpdateGameDetailsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateGameDetailsMutation, TError, UpdateGameDetailsMutationVariables, TContext>) => {
    
    return useMutation<UpdateGameDetailsMutation, TError, UpdateGameDetailsMutationVariables, TContext>(
      {
    mutationKey: ['updateGameDetails'],
    mutationFn: (variables?: UpdateGameDetailsMutationVariables) => fetchData<UpdateGameDetailsMutation, UpdateGameDetailsMutationVariables>(UpdateGameDetailsDocument, variables)(),
    ...options
  }
    )};
