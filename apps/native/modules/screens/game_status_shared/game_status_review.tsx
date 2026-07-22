import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/ui/typography/text";

const COLLAPSE_THRESHOLD = 100;

type GameStatusReviewProps = {
  review: string;
};

export const GameStatusReview = ({ review }: GameStatusReviewProps) => {
  const [isExpanded, setIsExpanded] = useState(
    review.length <= COLLAPSE_THRESHOLD,
  );
  const shouldCollapse = review.length > COLLAPSE_THRESHOLD;

  return (
    <View className="mx-4 rounded-2xl bg-background-50 p-4">
      <Text size="large" weight="bold" color="primary">
        Recenzja
      </Text>
      <View className="mt-2">
        <Text
          size="medium"
          weight="normal"
          color="primary"
          numberOfLines={isExpanded ? undefined : 3}
        >
          {review}
        </Text>
      </View>
      {shouldCollapse && (
        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          className="mt-2 min-h-[44px] flex-row items-center justify-center"
        >
          <Text size="small" weight="semiBold" color="active">
            {isExpanded ? "Zwiń" : "Rozwiń"}
          </Text>
          {isExpanded ? (
            <ChevronUp size={16} color="#3B82F6" />
          ) : (
            <ChevronDown size={16} color="#3B82F6" />
          )}
        </Pressable>
      )}
    </View>
  );
};
