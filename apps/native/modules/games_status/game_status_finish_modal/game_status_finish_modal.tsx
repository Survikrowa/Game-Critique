import { useEffect, useState } from "react";

import { GameStatus } from "../../../__generated__/types";
import { GAMES_SCORES } from "../games_status_form/games_scores";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { Select } from "@/ui/forms/select";
import { TextArea } from "@/ui/forms/text_area";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Sheet } from "@/ui/panels/sheet/sheet";
import { Text } from "@/ui/typography/text";

type GameStatusFinishModalProps = {
  status: GameStatus | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isSubmitting: boolean;
  onConfirm: (data: { score?: string; review?: string }) => void;
};

const TITLE_BY_STATUS: Partial<Record<GameStatus, string>> = {
  [GameStatus.Completed]: "Jaką ocenę dajesz tej grze?",
  [GameStatus.Retired]: "Chcesz dodać recenzję?",
};

/**
 * Shared quick-add modal for Completed/Retired statuses — used both from the
 * games list status-badge menu and from GameScreen's sticky CTA. Score is
 * required only for Completed; review is always optional.
 */
export const GameStatusFinishModal = ({
  status,
  isOpen,
  onOpenChange,
  isSubmitting,
  onConfirm,
}: GameStatusFinishModalProps) => {
  const [score, setScore] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (isOpen) {
      setScore("");
      setReview("");
    }
  }, [isOpen]);

  const isCompleted = status === GameStatus.Completed;

  const handleConfirm = () => {
    onConfirm({ score: score || undefined, review: review || undefined });
  };

  return (
    <Sheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      snapPointsMode="constant"
      displayAsModal
    >
      <VStack className="p-4 gap-4">
        <Text size="large" weight="bold" color="primary">
          {(status && TITLE_BY_STATUS[status]) || "Chcesz dodać recenzję?"}
        </Text>
        {isCompleted && (
          <Select
            placeholder="Wybierz ocenę..."
            label="Ocena"
            value={score}
            onChange={setScore}
            items={GAMES_SCORES}
          />
        )}
        <TextArea
          label="Opcjonalna recenzja"
          value={review}
          onChange={setReview}
        />
        <Button
          action="primary"
          isDisabled={(isCompleted && !score) || isSubmitting}
          onPress={handleConfirm}
        >
          <ButtonText>
            {isSubmitting ? "Trwa zapisywanie..." : "Zapisz"}
          </ButtonText>
        </Button>
      </VStack>
    </Sheet>
  );
};
