import { View } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { useAcceptChallengeMutation } from "../accept_challenge/accept_challenge.mutation.generated";
import { useDeclineChallengeMutation } from "../decline_challenge/decline_challenge.mutation.generated";
import { useForfeitChallengeMutation } from "../forfeit_challenge/forfeit_challenge.mutation.generated";
import type { ChallengesQuery } from "../use_challenges/challenges.query.generated";

import { haptic } from "@/modules/haptics/haptic";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type ChallengeRowProps = {
  challenge: ChallengesQuery["challenges"][number];
};

const ChallengeActionButton = ({
  label,
  onPress,
  variant,
}: {
  label: string;
  onPress: () => void;
  variant: "primary" | "danger";
}) => (
  <Pressable
    className={`min-h-[44px] justify-center rounded-lg px-4 ${
      variant === "primary" ? "bg-primary-500" : "bg-error-500"
    }`}
    onPress={onPress}
  >
    <Text size="medium" color="white" weight="semiBold">
      {label}
    </Text>
  </Pressable>
);

export const ChallengeRow = ({ challenge }: ChallengeRowProps) => {
  const { user } = useAuth0();
  const [acceptChallenge] = useAcceptChallengeMutation();
  const [declineChallenge] = useDeclineChallengeMutation();
  const [forfeitChallenge] = useForfeitChallengeMutation();

  const challengeId = Number(challenge.id);
  const isRecipient = user?.sub === challenge.recipientId;
  const isPending = challenge.status === "PENDING";
  const isActive = challenge.status === "ACTIVE";

  const canAccept = isRecipient && isPending;
  const canDecline = isRecipient && isPending;
  const canForfeit = isRecipient && isActive;

  const handleAccept = () => {
    haptic.medium();
    acceptChallenge({
      variables: { challengeId },
      refetchQueries: ["Challenges", "GroupLeaderboard"],
    });
  };

  const handleDecline = () => {
    haptic.heavy();
    declineChallenge({
      variables: { challengeId },
      refetchQueries: ["Challenges", "GroupLeaderboard"],
    });
  };

  const handleForfeit = () => {
    haptic.heavy();
    forfeitChallenge({
      variables: { challengeId },
      refetchQueries: ["Challenges", "GroupLeaderboard"],
    });
  };

  return (
    <VStack className="border-b border-outline-0 px-4 py-3">
      <Text size="medium" color="primary" weight="semiBold">
        {challenge.gameName ??
          challenge.description ??
          `Wyzwanie #${challenge.id}`}
      </Text>
      <Text size="small" color="secondary" weight="normal">
        {challenge.challengerName ?? "Unknown"} →{" "}
        {challenge.recipientName ?? "Unknown"}
      </Text>
      {(canAccept || canDecline) && (
        <View className="mt-2 flex-row gap-2">
          {canAccept && (
            <ChallengeActionButton
              label="Przyjmij"
              variant="primary"
              onPress={handleAccept}
            />
          )}
          {canDecline && (
            <ChallengeActionButton
              label="Odrzuć"
              variant="danger"
              onPress={handleDecline}
            />
          )}
        </View>
      )}
      {canForfeit && (
        <View className="mt-2">
          <ChallengeActionButton
            label="Poddaj się"
            variant="danger"
            onPress={handleForfeit}
          />
        </View>
      )}
    </VStack>
  );
};
