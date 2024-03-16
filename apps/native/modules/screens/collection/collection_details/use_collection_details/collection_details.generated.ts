import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CollectionDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['Float']['input'];
}>;


export type CollectionDetailsQuery = { __typename?: 'Query', collection: { __typename?: 'CollectionWithGamesDTO', id: number, name: string, description: string, games: Array<{ __typename?: 'GameWithCoversDTO', id: number, name: string, cover?: { __typename?: 'CoverDTO', bigUrl: string } | null }> } };


export const CollectionDetailsDocument = gql`
    query CollectionDetails($id: Float!) {
  collection(id: $id) {
    id
    name
    description
    games {
      id
      name
      cover {
        bigUrl
      }
    }
  }
}
    `;

/**
 * __useCollectionDetailsQuery__
 *
 * To run a query within a React component, call `useCollectionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCollectionDetailsQuery(baseOptions: Apollo.QueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, options);
      }
export function useCollectionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, options);
        }
export function useCollectionDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, options);
        }
export type CollectionDetailsQueryHookResult = ReturnType<typeof useCollectionDetailsQuery>;
export type CollectionDetailsLazyQueryHookResult = ReturnType<typeof useCollectionDetailsLazyQuery>;
export type CollectionDetailsSuspenseQueryHookResult = ReturnType<typeof useCollectionDetailsSuspenseQuery>;
export type CollectionDetailsQueryResult = Apollo.QueryResult<CollectionDetailsQuery, CollectionDetailsQueryVariables>;