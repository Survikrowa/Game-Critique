import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Skeleton } from "@/ui/feedback/skeleton/skeleton";

export const GameSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-0" edges={["top"]}>
      <ScrollView bounces={false}>
        <Skeleton className="w-full" style={{ height: 260 }} variant="sharp" />
        <View className="px-4 pt-4" style={{ gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Skeleton className="h-8 w-3/4 rounded-xl" />
            <View className="flex-row gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </View>
          </View>
          <Skeleton className="h-14 w-full rounded-2xl" />
          <View className="flex-row gap-3">
            <Skeleton className="flex-1 h-24 rounded-2xl" />
            <Skeleton className="flex-1 h-24 rounded-2xl" />
            <Skeleton className="flex-1 h-24 rounded-2xl" />
          </View>
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
