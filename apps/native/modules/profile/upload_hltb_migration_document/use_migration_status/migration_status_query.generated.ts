import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

import * as Types from "../../../../__generated__/types";
const defaultOptions = {} as const;
export type MigrationStatusQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type MigrationStatusQuery = {
  __typename?: "Query";
  migrationStatus: {
    __typename?: "HowLongToBeatMigrationStatusDTO";
    status?: Types.MigrationStatus | null;
  };
};

export const MigrationStatusDocument = gql`
  query MigrationStatus {
    migrationStatus {
      status
    }
  }
`;

/**
 * __useMigrationStatusQuery__
 *
 * To run a query within a React component, call `useMigrationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMigrationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMigrationStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useMigrationStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MigrationStatusQuery,
    MigrationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MigrationStatusQuery, MigrationStatusQueryVariables>(
    MigrationStatusDocument,
    options,
  );
}
export function useMigrationStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MigrationStatusQuery,
    MigrationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MigrationStatusQuery,
    MigrationStatusQueryVariables
  >(MigrationStatusDocument, options);
}
export function useMigrationStatusSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MigrationStatusQuery,
    MigrationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MigrationStatusQuery,
    MigrationStatusQueryVariables
  >(MigrationStatusDocument, options);
}
export type MigrationStatusQueryHookResult = ReturnType<
  typeof useMigrationStatusQuery
>;
export type MigrationStatusLazyQueryHookResult = ReturnType<
  typeof useMigrationStatusLazyQuery
>;
export type MigrationStatusSuspenseQueryHookResult = ReturnType<
  typeof useMigrationStatusSuspenseQuery
>;
export type MigrationStatusQueryResult = Apollo.QueryResult<
  MigrationStatusQuery,
  MigrationStatusQueryVariables
>;
