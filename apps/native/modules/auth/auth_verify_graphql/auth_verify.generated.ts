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

/** Single Collection */
export type CollectionDto = {
  __typename?: 'CollectionDTO';
  counter: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Single Collection with added items */
export type CollectionWithGamesDto = {
  __typename?: 'CollectionWithGamesDTO';
  description: Scalars['String']['output'];
  games: Array<GameWithCoversDto>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Cover = {
  __typename?: 'Cover';
  big_url: Scalars['String']['output'];
  medium_url: Scalars['String']['output'];
  small_url: Scalars['String']['output'];
};

/** Single Cover */
export type CoverDto = {
  __typename?: 'CoverDTO';
  id: Scalars['Float']['output'];
  largeUrl: Scalars['String']['output'];
  mediumUrl: Scalars['String']['output'];
  smallUrl: Scalars['String']['output'];
};

/** Single Game with covers */
export type GameWithCoversDto = {
  __typename?: 'GameWithCoversDTO';
  covers: Array<CoverDto>;
  hltbId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewCollection: CollectionDto;
  removeCollection: RemovedCollectionResponseDto;
  updateProfileInfo: ProfileInfoUpdateResponseDto;
};


export type MutationCreateNewCollectionArgs = {
  collection: NewCollectionDto;
};


export type MutationRemoveCollectionArgs = {
  collection: RemoveCollectionArgsDto;
};


export type MutationUpdateProfileInfoArgs = {
  profileInfo: ProfileInfoUpdateArgsDto;
};

/** New Collection */
export type NewCollectionDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** User profile info */
export type ProfileInfoDto = {
  __typename?: 'ProfileInfoDTO';
  /** User's avatar URL from Cloudinary */
  avatarUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** User profile info required to update profile */
export type ProfileInfoUpdateArgsDto = {
  /** User's avatar URL from Cloudinary */
  avatarUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** Response for updating profile info */
export type ProfileInfoUpdateResponseDto = {
  __typename?: 'ProfileInfoUpdateResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  collection: CollectionWithGamesDto;
  getProfileCollections: Array<CollectionDto>;
  profileInfo: ProfileInfoDto;
  search: SearchResult;
  verify: AuthUserVerification;
};


export type QueryCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};

/** Required arguments to remove a collection */
export type RemoveCollectionArgsDto = {
  collectionId: Scalars['Float']['input'];
};

/** Collection removed */
export type RemovedCollectionResponseDto = {
  __typename?: 'RemovedCollectionResponseDTO';
  success: Scalars['Boolean']['output'];
};

/** Search Games Result */
export type SearchGamesResult = {
  __typename?: 'SearchGamesResult';
  cover: Cover;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

/** Search result */
export type SearchResult = {
  __typename?: 'SearchResult';
  games: Array<SearchGamesResult>;
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