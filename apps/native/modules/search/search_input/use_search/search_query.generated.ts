import * as Types from '../../../../__generated__/types';

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
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};

/** Search result */
export type SearchResult = {
  __typename?: 'SearchResult';
  games: Array<IgdbGame>;
};

export type SearchGamesQueryVariables = Types.Exact<{
  search: Types.Scalars['String']['input'];
}>;


export type SearchGamesQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', games: Array<{ __typename?: 'IgdbGame', id: string, name: string, cover: { __typename?: 'Cover', url: string } }> } };


export const SearchGamesDocument = gql`
    query SearchGames($search: String!) {
  search(input: $search) {
    games {
      id
      name
      cover {
        url
      }
    }
  }
}
    `;

/**
 * __useSearchGamesQuery__
 *
 * To run a query within a React component, call `useSearchGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGamesQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchGamesQuery(baseOptions: Apollo.QueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
      }
export function useSearchGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
        }
export function useSearchGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchGamesQuery, SearchGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchGamesQuery, SearchGamesQueryVariables>(SearchGamesDocument, options);
        }
export type SearchGamesQueryHookResult = ReturnType<typeof useSearchGamesQuery>;
export type SearchGamesLazyQueryHookResult = ReturnType<typeof useSearchGamesLazyQuery>;
export type SearchGamesSuspenseQueryHookResult = ReturnType<typeof useSearchGamesSuspenseQuery>;
export type SearchGamesQueryResult = Apollo.QueryResult<SearchGamesQuery, SearchGamesQueryVariables>;