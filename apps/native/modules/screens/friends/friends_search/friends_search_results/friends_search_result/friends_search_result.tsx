import { Separator, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsSearchResultSendRequestButton } from "./friends_search_result_send_request_button/friends_search_result_send_request_button";
import { truncateString } from "../../../../../strings/truncate_string";
import { UserAvatar } from "../../../../../user/user_avatar/user_avatar";
import { useSendFriendRequest } from "../use_send_friend_request/use_send_friend_request";

type FriendsSearchResultProps = {
  oauthId: string;
  avatarUrl?: string;
  name?: string | null;
  usersLength: number;
  currentIndex: number;
  isFriendRequestSent: boolean;
};

export const FriendsSearchResult = ({
  usersLength,
  name,
  oauthId,
  avatarUrl,
  isFriendRequestSent,
  currentIndex,
}: FriendsSearchResultProps) => {
  const [sendFriendRequest, { loading, data }] = useSendFriendRequest();
  const handleSendFriendRequest = async (receiverId: string) => {
    await sendFriendRequest({
      variables: {
        receiverId,
      },
    });
  };

  return (
    <>
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap={8}>
          <UserAvatar avatarUrl={avatarUrl || ""} size="$6" />
          <Text size="medium" color="primary" weight="normal">
            {truncateString(name || "", 20)}
          </Text>
        </XStack>
        <FriendsSearchResultSendRequestButton
          isFriendRequestSent={isFriendRequestSent}
          handleSendFriendRequest={handleSendFriendRequest}
          oauthId={oauthId}
          sendFriendRequestLoading={loading}
          receiverId={data?.sendFriendRequest.receiverId}
        />
      </XStack>
      {usersLength > 1 && usersLength - 1 !== currentIndex && (
        <Separator marginVertical={8} />
      )}
    </>
  );
};
