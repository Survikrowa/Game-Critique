export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddGameToCollectionDto = {
  collectionId: Scalars['Float']['input'];
  hltbGameId: Scalars['Float']['input'];
};

export type AuthUserVerification = {
  __typename?: 'AuthUserVerification';
  authorized: Scalars['Boolean']['output'];
  role?: Maybe<Role>;
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

export type FiltersGameStatus = {
  achievementsCompleted: Scalars['String']['input'];
  platform: Scalars['String']['input'];
};

/** Friend request response */
export type FriendRequestResponseDto = {
  __typename?: 'FriendRequestResponseDTO';
  receiverId: Scalars['String']['output'];
};

export type FriendSingleEntry = {
  __typename?: 'FriendSingleEntry';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

/** Users friends activity DTO */
export type FriendsActivityDto = {
  __typename?: 'FriendsActivityDTO';
  user: User;
};

export type FriendsGameStatusReviewsDto = {
  __typename?: 'FriendsGameStatusReviewsDTO';
  profile?: Maybe<ProfileInfoDto>;
  review?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['String']['output']>;
};

export type FriendsList = {
  __typename?: 'FriendsList';
  friends: Array<FriendSingleEntry>;
};

/** GameCompletionTime */
export type GameCompletionTimeDto = {
  __typename?: 'GameCompletionTimeDTO';
  completionist: Scalars['Float']['output'];
  main: Scalars['Float']['output'];
  mainExtra: Scalars['Float']['output'];
};

/** Single Game Release(Year) Date */
export type GameReleaseDto = {
  __typename?: 'GameReleaseDTO';
  date?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
};

/** GameStatus Enum */
export enum GameStatus {
  Backlog = 'BACKLOG',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Retired = 'RETIRED'
}

/** GameStatus CompletedIn Arg */
export type GameStatusCompletedInArgDto = {
  hours?: InputMaybe<Scalars['String']['input']>;
  minutes?: InputMaybe<Scalars['String']['input']>;
  seconds?: InputMaybe<Scalars['String']['input']>;
};

/** GameStatus CompletedIn */
export type GameStatusCompletedInDto = {
  __typename?: 'GameStatusCompletedInDTO';
  hours?: Maybe<Scalars['Float']['output']>;
  minutes?: Maybe<Scalars['Float']['output']>;
  seconds?: Maybe<Scalars['Float']['output']>;
};

/** GameStatus */
export type GameStatusDto = {
  __typename?: 'GameStatusDTO';
  achievementsCompleted: Scalars['Boolean']['output'];
  completedIn?: Maybe<GameStatusCompletedInDto>;
  gameId: Scalars['Float']['output'];
  gameStatus: GameStatus;
  gamesStatusId?: Maybe<Scalars['Float']['output']>;
  platformId: Scalars['Float']['output'];
  score?: Maybe<Scalars['String']['output']>;
};

/** GameStatus Progress State */
export type GameStatusProgressState = {
  __typename?: 'GameStatusProgressState';
  label: Scalars['String']['output'];
  value: GameStatus;
};

/** GameStatus Progress State DTO */
export type GameStatusProgressStateDto = {
  __typename?: 'GameStatusProgressStateDTO';
  gameStatusProgressState: Array<GameStatusProgressState>;
};

/** GameStatus Removed Response */
export type GameStatusRemovedResponseDto = {
  __typename?: 'GameStatusRemovedResponseDTO';
  message: Scalars['String']['output'];
};

/** GameStatus Success Response */
export type GameStatusSuccessResponseDto = {
  __typename?: 'GameStatusSuccessResponseDTO';
  message: Scalars['String']['output'];
};

/** Game with all linked data */
export type GameWithAllDataDto = {
  __typename?: 'GameWithAllDataDTO';
  completionTime?: Maybe<GameCompletionTimeDto>;
  cover?: Maybe<CoverDto>;
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
  cover?: Maybe<CoverDto>;
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

/** Get Friend Requests response */
export type GetFriendRequestsResponseDto = {
  __typename?: 'GetFriendRequestsResponseDTO';
  senderOauthId: Scalars['String']['output'];
  senderProfile?: Maybe<ProfileInfoDto>;
};

export type HowLongToBeatMigrationStatusDto = {
  __typename?: 'HowLongToBeatMigrationStatusDTO';
  status?: Maybe<MigrationStatus>;
};

/** The status of the migration of a user's HowLongToBeat account */
export enum MigrationStatus {
  Failed = 'FAILED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Waiting = 'WAITING'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: FriendRequestResponseDto;
  addGameToCollection: CollectionMutationResponseDto;
  createNewCollection: CollectionDto;
  removeCollection: RemovedCollectionResponseDto;
  removeGameStatus: GameStatusSuccessResponseDto;
  /** Admin mutation to remove game status by gameStatusId and user oauthId */
  removeUserGameStatusByUserOauthId: GameStatusRemovedResponseDto;
  sendFriendRequest: FriendRequestResponseDto;
  updateGameData: UpdateGameDataDto;
  /** update platform display name */
  updatePlatformDisplayName: UpdatePlatformDisplayNameDto;
  updateProfileInfo: ProfileInfoUpdateResponseDto;
  updateUserRole: UpdateUserRoleDto;
  upsertGameStatus: GameStatusSuccessResponseDto;
};


export type MutationAcceptFriendRequestArgs = {
  senderOauthId: Scalars['String']['input'];
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


export type MutationRemoveGameStatusArgs = {
  gameStatusId: Scalars['Float']['input'];
};


export type MutationRemoveUserGameStatusByUserOauthIdArgs = {
  gameStatusId: Scalars['Float']['input'];
  oauthId: Scalars['String']['input'];
};


export type MutationSendFriendRequestArgs = {
  receiverOauthId: Scalars['String']['input'];
};


export type MutationUpdateGameDataArgs = {
  hltbId: Scalars['Float']['input'];
};


export type MutationUpdatePlatformDisplayNameArgs = {
  displayName: Scalars['String']['input'];
  platformId: Scalars['Float']['input'];
};


export type MutationUpdateProfileInfoArgs = {
  profileInfo: ProfileInfoUpdateArgsDto;
};


export type MutationUpdateUserRoleArgs = {
  updateUserRoleInput: UpdateUserRoleInput;
};


export type MutationUpsertGameStatusArgs = {
  upsertGameStatusArgs: UpsertGameStatusArgsDto;
};

/** New Collection */
export type NewCollectionDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PaginatedGames = {
  __typename?: 'PaginatedGames';
  items: Array<GameWithAllDataDto>;
  pagination: PaginationDto;
};

export type PaginationDto = {
  __typename?: 'PaginationDTO';
  hasMore: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  skip: Scalars['Float']['output'];
  take: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

/** Platform */
export type Platform = {
  __typename?: 'Platform';
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

/** Single Platform */
export type PlatformDto = {
  __typename?: 'PlatformDTO';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

/** All Platforms */
export type PlatformsDto = {
  __typename?: 'PlatformsDTO';
  platforms: Array<Platform>;
};

/** User profile info */
export type ProfileDto = {
  __typename?: 'ProfileDTO';
  /** User's avatar URL from Cloudinary */
  avatarUrl: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

/** User profile info */
export type ProfileInfoDto = {
  __typename?: 'ProfileInfoDTO';
  /** User's avatar URL from Cloudinary */
  avatarUrl: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
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
  /** Get available games status progress states */
  availableGamesStatusProgressStates: GameStatusProgressStateDto;
  collection: CollectionWithGamesDto;
  friendsActivity: Array<FriendsActivityDto>;
  friendsList: FriendsList;
  friendsRequests: Array<GetFriendRequestsResponseDto>;
  game: GameWithAllDataDto;
  games: PaginatedGames;
  /** Get games status sort options */
  gamesStatusSortOptions: SortOptionsDto;
  getAllUserGamesStatusByOauthId: Array<UserGamesStatusResponseDto>;
  getProfileCollections: Array<CollectionDto>;
  migrationStatus: HowLongToBeatMigrationStatusDto;
  /** Get user and friends game status reviews */
  ownerAndFriendsGameStatusReviews: Array<FriendsGameStatusReviewsDto>;
  /** Get all platforms */
  platforms: PlatformsDto;
  profileInfo: ProfileInfoDto;
  roles: Array<RoleDto>;
  search: SearchResult;
  user: UserDataDto;
  /** Query to get user"s friend games statuses */
  userFriendGamesStatus: UserFriendGamesStatusResponseWithPaginationDto;
  /** If oauthId is not provided it will use the id of the user that called the query */
  userGameStatus: UserGamesStatusResponseDto;
  /** If oauthId is not provided it will use the id of the user that called the query */
  userGamesStatus: UserGamesStatusResponseWithPaginationDto;
  /** Get user stats */
  userStats: Array<UserStatsDto>;
  users: Array<UserDto>;
  usersSearch: Array<UserSearchResultDto>;
  verify: AuthUserVerification;
};


export type QueryCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGameArgs = {
  hltbId: Scalars['Float']['input'];
};


export type QueryGamesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetAllUserGamesStatusByOauthIdArgs = {
  oauthId: Scalars['String']['input'];
};


export type QueryOwnerAndFriendsGameStatusReviewsArgs = {
  gameStatusId: Scalars['Float']['input'];
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};


export type QueryUserArgs = {
  oauthId: Scalars['String']['input'];
};


export type QueryUserFriendGamesStatusArgs = {
  filters?: InputMaybe<FiltersGameStatus>;
  oauthId: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort: SortOptionsArg;
  status: GameStatus;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryUserGameStatusArgs = {
  gameStatusId?: InputMaybe<Scalars['Float']['input']>;
  oauthId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserGamesStatusArgs = {
  filters?: InputMaybe<FiltersGameStatus>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort: SortOptionsArg;
  status: GameStatus;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryUserStatsArgs = {
  type: Scalars['String']['input'];
};


export type QueryUsersSearchArgs = {
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

/** Role Enum */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

/** Role */
export type RoleDto = {
  __typename?: 'RoleDTO';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
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

/** GameStatus Sort Options */
export type SortOptions = {
  __typename?: 'SortOptions';
  field: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  order: Scalars['String']['output'];
};

/** GameStatus Sort Options */
export type SortOptionsArg = {
  field: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

/** All possible sort options for games status */
export type SortOptionsDto = {
  __typename?: 'SortOptionsDTO';
  sortOptions: Array<SortOptions>;
};

export type UpdateGameDataDto = {
  __typename?: 'UpdateGameDataDTO';
  hltbId: Scalars['Float']['output'];
  message: Scalars['String']['output'];
};

/** Update Platform display name return */
export type UpdatePlatformDisplayNameDto = {
  __typename?: 'UpdatePlatformDisplayNameDTO';
  platform: Platform;
};

/** Update user role */
export type UpdateUserRoleDto = {
  __typename?: 'UpdateUserRoleDTO';
  success: Scalars['Boolean']['output'];
};

export type UpdateUserRoleInput = {
  roleId: Scalars['Float']['input'];
  userOauthId: Scalars['String']['input'];
};

export type UpsertGameStatusArgsDto = {
  achievementsCompleted: Scalars['Boolean']['input'];
  completedIn?: InputMaybe<GameStatusCompletedInArgDto>;
  gameId: Scalars['Float']['input'];
  gameStatus: GameStatus;
  gamesStatusId?: InputMaybe<Scalars['Float']['input']>;
  isEditing: Scalars['Boolean']['input'];
  platformId: Scalars['Float']['input'];
  review?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activity: Array<UserActivityDto>;
  name?: Maybe<Scalars['String']['output']>;
  oauthId: Scalars['String']['output'];
};

/** User activity */
export type UserActivityDto = {
  __typename?: 'UserActivityDTO';
  activityType: GameStatus;
  /** Formatted date of the activity update. Example: '2 dni temu' or 'wczoraj' etc. */
  formattedUpdatedAt: Scalars['String']['output'];
  game?: Maybe<GameWithCoversDto>;
  id: Scalars['Float']['output'];
  oauthId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** User */
export type UserDto = {
  __typename?: 'UserDTO';
  id: Scalars['Float']['output'];
  oauthId: Scalars['String']['output'];
  profile?: Maybe<ProfileInfoDto>;
  role?: Maybe<Role>;
};

/** User i dont know how to name it */
export type UserDataDto = {
  __typename?: 'UserDataDTO';
  gamesStatus?: Maybe<Array<GameStatusDto>>;
  id: Scalars['Float']['output'];
  oauthId: Scalars['String']['output'];
  profile?: Maybe<ProfileInfoDto>;
  userActivity?: Maybe<Array<UserActivityDto>>;
};

/** UserFriendGamesStatus Response with pagination */
export type UserFriendGamesStatusResponseWithPaginationDto = {
  __typename?: 'UserFriendGamesStatusResponseWithPaginationDTO';
  pagination: PaginationDto;
  userGamesStatus: Array<UserGamesStatusResponseDto>;
};

/** UserGamesStatus Response */
export type UserGamesStatusResponseDto = {
  __typename?: 'UserGamesStatusResponseDTO';
  achievementsCompleted: Scalars['Boolean']['output'];
  completedIn?: Maybe<GameStatusCompletedInDto>;
  game: GameWithAllDataDto;
  id: Scalars['Float']['output'];
  platform: PlatformDto;
  review?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['String']['output']>;
  status: GameStatus;
};

/** UserGamesStatus Response with pagination */
export type UserGamesStatusResponseWithPaginationDto = {
  __typename?: 'UserGamesStatusResponseWithPaginationDTO';
  pagination: PaginationDto;
  userGamesStatus: Array<UserGamesStatusResponseDto>;
};

/** User Search Result */
export type UserSearchResultDto = {
  __typename?: 'UserSearchResultDTO';
  id: Scalars['Float']['output'];
  isFriendRequestSent: Scalars['Boolean']['output'];
  oauthId: Scalars['String']['output'];
  profile?: Maybe<ProfileDto>;
  role?: Maybe<Role>;
};

export type UserStatsDto = {
  __typename?: 'UserStatsDTO';
  label: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};
