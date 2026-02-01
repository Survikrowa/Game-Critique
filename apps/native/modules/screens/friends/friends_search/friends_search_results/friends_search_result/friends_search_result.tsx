import { Separator } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsSearchResultSendRequestButton } from "./friends_search_result_send_request_button/friends_search_result_send_request_button";
import { useSendFriendRequest } from "../use_send_friend_request/use_send_friend_request";

import { truncateString } from "@/modules/strings/truncate_string";
import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { HStack } from "@/ui/layout/hstack/hstack";

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
      <HStack className="justify-between items-center">
        <HStack className="items-center gap-2">
          <UserAvatar avatarUrl={avatarUrl || ""} size="$6" />
          <Text size="medium" color="primary" weight="normal">
            {truncateString(name || "", 20)}
          </Text>
        </HStack>
        <FriendsSearchResultSendRequestButton
          isFriendRequestSent={isFriendRequestSent}
          handleSendFriendRequest={handleSendFriendRequest}
          oauthId={oauthId}
          sendFriendRequestLoading={loading}
          receiverId={data?.sendFriendRequest.receiverId}
        />
      </HStack>
      {usersLength > 1 && usersLength - 1 !== currentIndex && (
        <Separator marginVertical={8} />
      )}
    </>
  );
};
