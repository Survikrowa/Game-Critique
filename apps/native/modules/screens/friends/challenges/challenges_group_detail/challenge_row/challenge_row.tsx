import { View } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { useAcceptChallengeMutation } from "../accept_challenge/accept_challenge.mutation.generated";
import { ChallengeActionButton } from "../challenge_action_button/challenge_action_button";
import { useCompleteChallengeMutation } from "../complete_challenge/complete_challenge.mutation.generated";
import { useConfirmChallengeCompletionMutation } from "../confirm_challenge_completion/confirm_challenge_completion.mutation.generated";
import { useDeclineChallengeMutation } from "../decline_challenge/decline_challenge.mutation.generated";
import { useForfeitChallengeMutation } from "../forfeit_challenge/forfeit_challenge.mutation.generated";
import type { ChallengesQuery } from "../use_challenges/challenges.query.generated";

import { haptic } from "@/modules/haptics/haptic";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type ChallengeRowProps = {
  challenge: ChallengesQuery["challenges"][number];
};

export const ChallengeRow = ({ challenge }: ChallengeRowProps) => {
  const { user } = useAuth0();
  const [acceptChallenge] = useAcceptChallengeMutation();
  const [completeChallenge] = useCompleteChallengeMutation();
  const [confirmChallengeCompletion] = useConfirmChallengeCompletionMutation();
  const [declineChallenge] = useDeclineChallengeMutation();
  const [forfeitChallenge] = useForfeitChallengeMutation();

  const challengeId = Number(challenge.id);
  const isRecipient = user?.sub === challenge.recipientId;
  const isChallenger = user?.sub === challenge.challengerId;
  const isPending = challenge.status === "PENDING";
  const isActive = challenge.status === "ACTIVE";
  const isAwaitingConfirmation = challenge.status === "AWAITING_CONFIRMATION";
  const isInGameChallenge = challenge.type === "IN_GAME_CHALLENGE";

  const canAccept = isRecipient && isPending;
  const canDecline = isRecipient && isPending;
  const canForfeit = isRecipient && isActive;
  const canCompleteChallenge = isRecipient && isActive && isInGameChallenge;
  const canConfirmCompletion = isChallenger && isAwaitingConfirmation;

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

  const handleCompleteChallenge = () => {
    haptic.medium();
    completeChallenge({
      variables: { challengeId },
      refetchQueries: ["Challenges", "GroupLeaderboard"],
    });
  };

  const handleConfirmCompletion = () => {
    haptic.medium();
    confirmChallengeCompletion({
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
      {canCompleteChallenge && (
        <View className="mt-2">
          <ChallengeActionButton
            label="Zgłoś ukończenie"
            variant="primary"
            onPress={handleCompleteChallenge}
          />
        </View>
      )}
      {canConfirmCompletion && (
        <View className="mt-2">
          <ChallengeActionButton
            label="Potwierdź"
            variant="primary"
            onPress={handleConfirmCompletion}
          />
        </View>
      )}
    </VStack>
  );
};
