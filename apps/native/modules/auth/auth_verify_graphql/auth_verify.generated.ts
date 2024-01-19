import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthUserVerification = {
  __typename?: 'AuthUserVerification';
  authorized: Scalars['Boolean']['output'];
};

export type Cover = {
  __typename?: 'Cover';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  igdbId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type IgdbGame = {
  __typename?: 'IgdbGame';
  cover: Cover;
  first_release_date?: Maybe<Scalars['Float']['output']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  platforms?: Maybe<Array<Platform>>;
  slug: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Platform = {
  __typename?: 'Platform';
  id: Scalars['ID']['output'];
  igdbId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  search: SearchResult;
  verify: AuthUserVerification;
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};

/** Search result */
export type SearchResult = {
  __typename?: 'SearchResult';
  games: Array<IgdbGame>;
};

export type VerifyOrCreateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyOrCreateQuery = { __typename?: 'Query', verify: { __typename?: 'AuthUserVerification', authorized: boolean } };


export const VerifyOrCreateDocument = gql`
    query VerifyOrCreate {
  verify {
    authorized
  }
}
    `;

/**
 * __useVerifyOrCreateQuery__
 *
 * To run a query within a React component, call `useVerifyOrCreateQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyOrCreateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyOrCreateQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyOrCreateQuery(baseOptions?: Apollo.QueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
      }
export function useVerifyOrCreateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
        }
export function useVerifyOrCreateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>(VerifyOrCreateDocument, options);
        }
export type VerifyOrCreateQueryHookResult = ReturnType<typeof useVerifyOrCreateQuery>;
export type VerifyOrCreateLazyQueryHookResult = ReturnType<typeof useVerifyOrCreateLazyQuery>;
export type VerifyOrCreateSuspenseQueryHookResult = ReturnType<typeof useVerifyOrCreateSuspenseQuery>;
export type VerifyOrCreateQueryResult = Apollo.QueryResult<VerifyOrCreateQuery, VerifyOrCreateQueryVariables>;