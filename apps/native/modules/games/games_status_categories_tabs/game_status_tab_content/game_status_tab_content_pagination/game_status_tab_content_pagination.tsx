import { ArrowLeft, ArrowRight } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { XStack } from "tamagui";

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
  const navigation = useNavigation();
  const handlePreviousPage = () => {
    if (skip != null && take != null) {
      // @ts-ignore
      navigation.setParams({
        skip: Number(skip) - 5,
        take: Number(take) - 5,
      });
      onPreviousPage({
        take: Number(take) - 5,
        skip: Number(skip) - 5,
      });
    }
  };
  const handleNextPage = () => {
    if (skip != null && take != null) {
      // @ts-ignore
      navigation.setParams({
        skip: Number(skip) + Number(take),
        take: Number(take) + 5,
      });
      onNextPage({
        take: Number(take) + 5,
        skip: Number(skip) + Number(take),
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
