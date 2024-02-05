import * as Types from '../../../../../../__generated__/types';

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

export type AddGameToCollectionDto = {
  collectionId: Scalars['Float']['input'];
  hltbGameId: Scalars['Float']['input'];
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

/** Collection Mutation success */
export type CollectionMutationResponseDto = {
  __typename?: 'CollectionMutationResponseDTO';
  success: Scalars['Boolean']['output'];
};

/** Single Collection with added items */
export type CollectionWithGamesDto = {
  __typename?: 'CollectionWithGamesDTO';
  description: Scalars['String']['output'];
  games: Array<GameWithCoversDto>;
  id: Scalars['Float']['output'];
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
  bigUrl: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  mediumUrl: Scalars['String']['output'];
  smallUrl: Scalars['String']['output'];
};

/** Single Game Release(Year) Date */
export type GameReleaseDto = {
  __typename?: 'GameReleaseDTO';
  date?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
};

/** Game with all linked data */
export type GameWithAllDataDto = {
  __typename?: 'GameWithAllDataDTO';
  covers?: Maybe<CoverDto>;
  genres: Array<GenresDto>;
  hltbId: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  platforms: Array<PlatformDto>;
  releases?: Maybe<GameReleaseDto>;
  slug: Scalars['String']['output'];
};

/** Single Game with covers */
export type GameWithCoversDto = {
  __typename?: 'GameWithCoversDTO';
  covers: CoverDto;
  hltbId: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

/** Single Platform */
export type GenresDto = {
  __typename?: 'GenresDto';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGameToCollection: CollectionMutationResponseDto;
  createNewCollection: CollectionDto;
  removeCollection: RemovedCollectionResponseDto;
  updateProfileInfo: ProfileInfoUpdateResponseDto;
};


export type MutationAddGameToCollectionArgs = {
  collection: AddGameToCollectionDto;
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

/** Single Platform */
export type PlatformDto = {
  __typename?: 'PlatformDTO';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
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
  game: GameWithAllDataDto;
  getProfileCollections: Array<CollectionDto>;
  profileInfo: ProfileInfoDto;
  search: SearchResult;
  verify: AuthUserVerification;
};


export type QueryCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGameArgs = {
  hltbId: Scalars['Float']['input'];
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

export type AddGameToCollectionMutationVariables = Types.Exact<{
  input: Types.AddGameToCollectionDto;
}>;


export type AddGameToCollectionMutation = { __typename?: 'Mutation', addGameToCollection: { __typename?: 'CollectionMutationResponseDTO', success: boolean } };


export const AddGameToCollectionDocument = gql`
    mutation AddGameToCollection($input: AddGameToCollectionDTO!) {
  addGameToCollection(collection: $input) {
    success
  }
}
    `;
export type AddGameToCollectionMutationFn = Apollo.MutationFunction<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>;

/**
 * __useAddGameToCollectionMutation__
 *
 * To run a mutation, you first call `useAddGameToCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGameToCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGameToCollectionMutation, { data, loading, error }] = useAddGameToCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddGameToCollectionMutation(baseOptions?: Apollo.MutationHookOptions<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>(AddGameToCollectionDocument, options);
      }
export type AddGameToCollectionMutationHookResult = ReturnType<typeof useAddGameToCollectionMutation>;
export type AddGameToCollectionMutationResult = Apollo.MutationResult<AddGameToCollectionMutation>;
export type AddGameToCollectionMutationOptions = Apollo.BaseMutationOptions<AddGameToCollectionMutation, AddGameToCollectionMutationVariables>;