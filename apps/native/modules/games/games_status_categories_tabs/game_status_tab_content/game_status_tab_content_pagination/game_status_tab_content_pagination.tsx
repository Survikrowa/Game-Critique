import { ArrowLeft, ArrowRight } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { XStack } from "tamagui";

import { UserProfileScreenProps } from "../../../../router/screen_props";

type GameStatusTabContentPaginationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: (pagination: PaginationArgs) => void;
  onPreviousPage: (pagination: PaginationArgs) => void;
};

type PaginationArgs = {
  take: number;
  skip: number;
};

export const GameStatusTabContentPagination = ({
  onPreviousPage,
  onNextPage,
  hasPreviousPage,
  hasNextPage,
}: GameStatusTabContentPaginationProps) => {
  const { skip, take } = useLocalSearchParams<{ skip: string; take: string }>();
  const navigation = useNavigation<UserProfileScreenProps["navigation"]>();
  const handlePreviousPage = () => {
    if (skip != null && take != null) {
      const skipParam = Number(skip) - 5;
      const takeParam = Number(take) - 5;
      navigation.setParams({
        skip: skipParam.toString(),
        take: takeParam.toString(),
      });
      onPreviousPage({
        take: takeParam,
        skip: skipParam,
      });
    }
  };
  const handleNextPage = () => {
    if (skip != null && take != null) {
      const skipParam = Number(skip) + Number(take);
      const takeParam = Number(take) + 5;
      navigation.setParams({
        skip: skipParam.toString(),
        take: takeParam.toString(),
      });
      onNextPage({
        take: takeParam,
        skip: skipParam,
      });
    }
  };
  return (
    <XStack justifyContent="space-between" padding={8}>
      <TouchableOpacity onPress={handlePreviousPage}>
        {hasPreviousPage && <ArrowLeft />}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextPage}>
        {hasNextPage && <ArrowRight />}
      </TouchableOpacity>
    </XStack>
  );
};
