import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { VStack } from "@/ui/layout/vstack/vstack";

const CHALLENGE_SKELETON_COUNT = 4;

export const ChallengeListSkeleton = () => (
  <VStack className="gap-3 px-4 pt-4">
    {Array.from({ length: CHALLENGE_SKELETON_COUNT }).map((_, index) => (
      <Skeleton key={index} style={{ height: 56 }} />
    ))}
  </VStack>
);
