import { FlatList, useWindowDimensions, View } from "react-native";

import { useBacklogProgress } from "../use_get_backlog_progress/use_get_backlog_progress";
import { useYearlySummary } from "../use_get_yearly_summary/use_get_yearly_summary";

import { Text } from "@/ui/typography/text";

const CURRENT_YEAR = 2026;
const ROUNDING_PRECISION = 10;

type WrappedSlideProps = {
  yearlyGames: number;
  yearlyHours: number;
  backlogRatio: number;
};

const YearTitleSlide = () => (
  <View className="flex-1 items-center justify-center bg-background-0 px-8">
    <Text size="extraLarge" weight="bold" color="primary">
      Twój rok {CURRENT_YEAR}
    </Text>
    <View className="mt-4">
      <Text size="large" weight="normal" color="secondary">
        Podsumowanie Twojego gamingowego roku
      </Text>
    </View>
  </View>
);

const GamesCountSlide = ({ yearlyGames }: WrappedSlideProps) => (
  <View className="flex-1 items-center justify-center bg-background-0 px-8">
    <Text size="extraLarge" weight="bold" color="primary">
      Zagrałeś w {yearlyGames} gier
    </Text>
    <View className="mt-4">
      <Text size="large" weight="normal" color="secondary">
        Całkiem imponująca kolekcja!
      </Text>
    </View>
  </View>
);

const TotalHoursSlide = ({ yearlyHours }: WrappedSlideProps) => {
  const nightsWithoutSleep =
    Math.round((yearlyHours / 24) * ROUNDING_PRECISION) / ROUNDING_PRECISION;

  return (
    <View className="flex-1 items-center justify-center bg-background-0 px-8">
      <Text size="extraLarge" weight="bold" color="primary">
        Twoja suma to {yearlyHours}h
      </Text>
      <View className="mt-4">
        <Text size="large" weight="normal" color="secondary">
          To jak {nightsWithoutSleep} nocy bez snu
        </Text>
      </View>
    </View>
  );
};

const BacklogProgressSlide = ({ backlogRatio }: WrappedSlideProps) => (
  <View className="flex-1 items-center justify-center bg-background-0 px-8">
    <Text size="extraLarge" weight="bold" color="primary">
      Backlog progress
    </Text>
    <View className="mt-4">
      <Text size="large" weight="normal" color="secondary">
        Ukończyłeś {Math.round(backlogRatio * 100)}% backlogu
      </Text>
    </View>
  </View>
);

const ShareSlide = () => (
  <View className="flex-1 items-center justify-center bg-background-0 px-8">
    <Text size="extraLarge" weight="bold" color="primary">
      Udostępnij swój rok
    </Text>
    <View className="mt-4">
      <Text size="large" weight="normal" color="secondary">
        Pochwal się znajomym swoim gamingowym podsumowaniem
      </Text>
    </View>
  </View>
);

export const StatsWrappedScreen = () => {
  const { width, height } = useWindowDimensions();
  const yearlySummary = useYearlySummary({ year: CURRENT_YEAR });
  const backlogProgress = useBacklogProgress({ year: CURRENT_YEAR });

  const summary = yearlySummary.data?.yearlySummary;
  const backlog = backlogProgress.data?.backlogProgress;

  const yearlyGames = summary?.yearlyGames ?? 0;
  const yearlyHours = summary?.yearlyHours ?? 0;
  const backlogRatio = backlog?.ratio ?? 0;

  const slideProps: WrappedSlideProps = {
    yearlyGames,
    yearlyHours,
    backlogRatio,
  };

  const SLIDES = [
    { id: "year", render: () => <YearTitleSlide /> },
    { id: "games", render: () => <GamesCountSlide {...slideProps} /> },
    { id: "hours", render: () => <TotalHoursSlide {...slideProps} /> },
    { id: "backlog", render: () => <BacklogProgressSlide {...slideProps} /> },
    { id: "share", render: () => <ShareSlide /> },
  ];

  return (
    <View className="flex-1 bg-background-0">
      <FlatList
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width, height }}>{item.render()}</View>
        )}
      />
    </View>
  );
};
