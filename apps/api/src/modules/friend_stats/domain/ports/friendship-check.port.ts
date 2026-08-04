export const FRIENDSHIP_CHECK_PORT = Symbol('FRIENDSHIP_CHECK_PORT');

export interface FriendshipCheckPort {
  areFriends(userOauthId: string, targetOauthId: string): Promise<boolean>;
}
