import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import * as Types from "../../../../../../../../../types.ts";

import { fetchData } from "@/codegen/fetcher.ts";

export type DeleteGameStatusMutationVariables = Types.Exact<{
  gameStatusId: Types.Scalars["Float"]["input"];
  userOauthId: Types.Scalars["String"]["input"];
}>;

export type DeleteGameStatusMutation = {
  __typename?: "Mutation";
  removeUserGameStatusByUserOauthId: {
    __typename?: "GameStatusRemovedResponseDTO";
    message: string;
  };
};

export const DeleteGameStatusDocument = `
    mutation DeleteGameStatus($gameStatusId: Float!, $userOauthId: String!) {
  removeUserGameStatusByUserOauthId(
    gameStatusId: $gameStatusId
    oauthId: $userOauthId
  ) {
    message
  }
}
    `;

export const useDeleteGameStatusMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    DeleteGameStatusMutation,
    TError,
    DeleteGameStatusMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DeleteGameStatusMutation,
    TError,
    DeleteGameStatusMutationVariables,
    TContext
  >({
    mutationKey: ["DeleteGameStatus"],
    mutationFn: (variables?: DeleteGameStatusMutationVariables) =>
      fetchData<DeleteGameStatusMutation, DeleteGameStatusMutationVariables>(
        DeleteGameStatusDocument,
        variables,
      )(),
    ...options,
  });
};
