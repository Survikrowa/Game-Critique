import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { VStack } from "@/ui/layout/vstack/vstack";

const TITLE_SKELETON_HEIGHT = 24;
const ROW_SKELETON_HEIGHT = 44;

export const CreateChallengeSkeleton = () => (
  <VStack className="gap-3 px-4 pt-4">
    <Skeleton style={{ height: TITLE_SKELETON_HEIGHT }} />
    <Skeleton style={{ height: ROW_SKELETON_HEIGHT }} />
    <Skeleton style={{ height: ROW_SKELETON_HEIGHT }} />
    <Skeleton style={{ height: ROW_SKELETON_HEIGHT }} />
  </VStack>
);
